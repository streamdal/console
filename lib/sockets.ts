import { serviceSignal } from "../components/serviceMap/serviceSignal.ts";
import { audienceMetricsSignal } from "../components/serviceMap/customEdge.tsx";
import {
  MAX_TAIL_SIZE,
  tailSamplingRateSignal,
  tailSamplingSignal,
  tailSignal,
} from "../islands/tail.tsx";
import { Audience } from "snitch-protos/protos/sp_common.ts";

export const getSocket = (path: string) => {
  const url = new URL(path, location.href);
  url.protocol = url.protocol.replace("http", "ws");
  return new WebSocket(url);
};
export const serviceMapSocket = (path: string) => {
  const webSocket = getSocket(path);
  webSocket.addEventListener("open", () => {
    webSocket.send("ping");
  });

  webSocket.addEventListener("message", (event) => {
    if (event.data === "pong") {
      console.debug("got server pong");
      return;
    }

    try {
      const parsedData = JSON.parse(event.data);
      serviceSignal.value = {
        ...parsedData,
        nodesMap: new Map(parsedData.nodesMap),
        edgesMap: new Map(parsedData.edgesMap),
      };
    } catch (e) {
      console.error("error parsing serviceMap socket data", e);
    }
  });
  return webSocket;
};

export const audienceMetricsSocket = (path: string) => {
  const webSocket = getSocket(path);

  webSocket.addEventListener("open", () => {
    webSocket.send("ping");
  });

  webSocket.addEventListener("message", (event) => {
    if (event.data === "pong") {
      console.debug("got server pong");
      return;
    }

    try {
      const parsedData = JSON.parse(event.data);
      audienceMetricsSignal.value = {
        ...audienceMetricsSignal.value,
        ...parsedData,
      };
    } catch (e) {
      console.error("error parsing audience metrics socket data", e);
    }
  });
  return webSocket;
};

export const tailSocket = (path: string, audience: Audience) => {
  const webSocket = getSocket(path);

  webSocket.addEventListener("open", () => {
    webSocket.send("ping");
    webSocket.send(
      JSON.stringify({
        audience,
        ...tailSamplingSignal.value
          ? { sampling: tailSamplingRateSignal.value }
          : {},
      }),
    );
  });

  webSocket.addEventListener("message", (event) => {
    if (event.data === "pong") {
      console.debug("got server pong");
      return;
    }

    try {
      const parsedTail = JSON.parse(event.data);
      tailSignal.value = [
        ...tailSignal.value.slice(
          -MAX_TAIL_SIZE,
        ),
        {
          timestamp: new Date(parsedTail.timestamp),
          data: parsedTail.data,
        },
      ];
    } catch (e) {
      console.error("error parsing tail data", e);
    }
  });
  return webSocket;
};
