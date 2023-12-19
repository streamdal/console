import IconPencil from "tabler-icons/tsx/pencil.tsx";
import IconPlus from "tabler-icons/tsx/plus.tsx";

import { Pipeline } from "streamdal-protos/protos/sp_pipeline.ts";
import { Tooltip } from "../components/tooltip/tooltip.tsx";
import PipelineDetail, { newPipeline } from "./pipeline.tsx";
import { SuccessType } from "../routes/_middleware.ts";
import { Toast, toastSignal } from "../components/toasts/toast.tsx";
import { OP_MODAL_WIDTH } from "./drawer/infoDrawer.tsx";
import { NotificationConfig } from "streamdal-protos/protos/sp_notify.ts";

const Pipelines = (
  { id, pipelines, notifications, success, add = false }: {
    id?: string;
    pipelines?: Pipeline[];
    notifications?: NotificationConfig[];
    success: SuccessType;
    add?: boolean;
  },
) => {
  //
  // wrapper supports adding a new entry
  const wrapper = [
    ...pipelines,
    ...pipelines.length === 0 || add ? [newPipeline] : [],
  ];

  const index = id && wrapper?.findIndex((p) => p.id === id);
  const selected = add ? wrapper.length - 1 : index > -1 ? index : 0;

  if (success?.message) {
    toastSignal.value = {
      id: "pipeline",
      type: success.status ? "success" : "error",
      message: success.message,
    };
  }

  return (
    <>
      <div
        className={`relative flex flex-col h-screen w-[calc(100vw-${OP_MODAL_WIDTH})]`}
      >
        <div className="h-46 w-full bg-streamdalPurple p-4 text-white font-semibold text-sm">
          <span className="opacity-50">Home</span> / Manage Pipelines
        </div>
        <div class="relative bg-white h-full">
          <div class="flex justify-start h-full">
            <div class="border-r w-1/3 flex flex-col pb-[16px] overflow-y-auto">
              <div class="flex justify-between items-center pt-[26px] pb-[16px] px-[14px]">
                <div class="text-[16px] font-bold">Pipelines</div>
                <a href="/pipelines/add">
                  <IconPlus
                    data-tooltip-target="pipeline-add"
                    class="w-5 h-5 cursor-pointer"
                  />
                </a>
                <Tooltip
                  targetId="pipeline-add"
                  message="Add a new pipeline"
                />
              </div>
              {wrapper?.map((p: Pipeline, i: number) => (
                <a href={`/pipelines/${p.id}`}>
                  <div
                    class={`flex flex-row items-center justify-between py-[14px] pl-[30px] pr-[12px] ${
                      i === selected && "bg-sunset"
                    } cursor-pointer hover:bg-sunset`}
                  >
                    {p.name}
                    {selected === i &&
                      <IconPencil class="w-4 h-4 text-web" />}
                  </div>
                </a>
              ))}
            </div>
            <div class="w-full max-h-[88vh] overflow-y-auto">
              <PipelineDetail
                pipeline={wrapper[selected]}
                notifications={notifications}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
      <Toast id="pipeline" />
    </>
  );
};

export default Pipelines;
