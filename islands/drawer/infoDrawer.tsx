import { ServiceSignal } from "../../components/serviceMap/serviceSignal.ts";
import { opModal } from "../../components/serviceMap/opModalSignal.ts";
import { EmptyStateBird } from "../../components/icons/emptyStateBird.tsx";
import Operation from "./operation.tsx";
import Service from "./service.tsx";
import Component from "./component.tsx";
import { Toast } from "../../components/toasts/toast.tsx";

export const OP_MODAL_WIDTH = "308px";

const EmptyDrawer = () => (
  <div
    class={`fixed z-50 h-screen top-0 right-0 transition-transform ${`translate-x-full right-[${OP_MODAL_WIDTH}]`} flex flex-row justify-end items-start overflow-y-scroll`}
  >
    <div class="w-[308px] shadow-xl h-full bg-white">
      <div class="bg-white min-h-screen">
        <div class="w-full h-screen flex flex-col justify-center items-center">
          <EmptyStateBird class="mb-2" />
          <h2 class="text-[#8E84AD]">No Items Selected</h2>
        </div>
      </div>
    </div>
  </div>
);

export const DrawerContents = (
  { serviceMap }: { serviceMap: ServiceSignal },
) => {
  switch (opModal.value?.displayType) {
    case "operation":
      return <Operation serviceMap={serviceMap} />;
    case "service":
      return <Service serviceMap={serviceMap} />;
    case "component":
      return <Component />;
    default:
      return <EmptyDrawer />;
  }
};

export const InfoDrawer = ({ serviceMap }: { serviceMap: ServiceSignal }) => {
  return (
    <>
      <Toast id="pipelineCrud" />
      {<DrawerContents serviceMap={serviceMap} />}
    </>
  );
};
