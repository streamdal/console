import { LayoutContext } from "$fresh/server.ts";
import ServiceMapComponent, { opUpdateSignal } from "../islands/serviceMap.tsx";
import { NavBar } from "../components/nav/nav.tsx";
import { ReactFlowProvider } from "reactflow";
import OpModal from "../islands/opModal.tsx";
import { serviceSignal } from "../components/serviceMap/serviceSignal.ts";
import { initAllServices } from "../lib/fetch.ts";
import { Toast, toastSignal } from "../components/toasts/toast.tsx";
import { opModal } from "../components/serviceMap/opModalSignal.ts";

export default async function Layout(req: Request, ctx: LayoutContext) {
  await initAllServices();
  const success = ctx.data?.success;

  if (success?.message) {
    toastSignal.value = {
      id: "global",
      type: success.status ? "success" : "error",
      message: success.message,
    };
  }

  return (
    <>
      <Toast id={"global"} />
      <NavBar />
      {!req.url.includes("/email") && (
        <OpModal serviceMap={serviceSignal.value} />
      )}
      <div className="flex flex-col w-screen text-web">
        <ReactFlowProvider>
          <ctx.Component />
          <ServiceMapComponent
            initNodes={serviceSignal.value
              ? Array.from(serviceSignal.value.nodesMap.values())
              : []}
            initEdges={serviceSignal.value
              ? Array.from(serviceSignal.value.edgesMap.values())
              : []}
            blur={req.url.includes("pipelines") ||
              req.url.includes("notifications")}
          />
        </ReactFlowProvider>

        <div class="absolute bottom-0 left-0 text-streamdalPurple ml-2 mb-1">
          {await Deno.readTextFile("VERSION")}
        </div>
      </div>
    </>
  );
}
