import { GetAllResponse } from "streamdal-protos/protos/sp_external.ts";
import { FlowEdge, FlowNode, mapEdges, mapNodes } from "./nodeMapper.ts";
import { ClientInfo, LiveInfo } from "streamdal-protos/protos/sp_info.ts";
import { audienceKey } from "./utils.ts";

export type ServiceMapper = GetAllResponse & {
  liveAudiences: Map<string, ClientInfo[]>;
};

export type DisplayServiceMap = {
  nodesMap: Map<string, FlowNode>;
  edgesMap: Map<string, FlowEdge>;
};

export const mapLiveAudiences = (live: LiveInfo[]) => {
  const liveAudiences = new Map<string, ClientInfo[]>();

  for (const l of live) {
    for (const a of l.audiences) {
      const key = audienceKey(a);
      liveAudiences.has(key)
        ? liveAudiences.set(key, [
          ...liveAudiences.get(key) as ClientInfo[],
          l.client as ClientInfo,
        ])
        : liveAudiences.set(key, [l.client] as ClientInfo[]);
    }
  }
  return liveAudiences;
};

export const mapServiceResponse = (
  response: GetAllResponse,
): ServiceMapper => ({
  ...response,
  liveAudiences: mapLiveAudiences(response.live),
});

export const mapServiceDisplay = (
  serviceMap: ServiceMapper,
): DisplayServiceMap => {
  const nodesMap = mapNodes(serviceMap);
  const edgesMap = mapEdges(serviceMap.audiences);

  return {
    nodesMap,
    edgesMap,
  };
};
