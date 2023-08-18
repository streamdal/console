import { PipelineInfo } from "snitch-protos/protos/info.ts";
import IconPlus from "tabler-icons/tsx/plus.tsx";
import { getAudienceOpRoute } from "../../lib/utils.ts";
import { toastSignal } from "../toasts/toast.tsx";
import { opModal } from "../serviceMap/opModalSignal.ts";
import { ServiceMapType } from "../../lib/fetch.ts";
import { opUpdateSignal, serviceSignal } from "../../islands/serviceMap.tsx";

export const OddAttachModal = (
  { serviceMap }: { serviceMap: ServiceMapType },
) => {
  const audience = opModal.value.audience;
  const attachedPipeline = opModal.value.attachedPipeline;

  const sortPipelines = (pipes: PipelineInfo[]) =>
    pipes?.sort((a, b) => a.pipeline.name.localeCompare(b.pipeline.name));

  const sorted = attachedPipeline?.id
    ? [
      ...[serviceMap.pipes.find((p: PipelineInfo) =>
        p.pipeline.id === attachedPipeline.id
      )],
      ...sortPipelines(serviceMap.pipes.filter((p: PipelineInfo) =>
        p.pipeline.id !== attachedPipeline?.id
      )),
    ]
    : sortPipelines(serviceMap.pipes);

  const attachPipeline = async (e: any) => {
    const response = await fetch(
      `${getAudienceOpRoute(audience)}/pipeline/${e.target.value}/attach`,
      {
        method: "POST",
      },
    );

    const { success } = await response.json();

    if (success.message) {
      toastSignal.value = {
        id: "pipelineCrud",
        type: success.status ? "success" : "error",
        message: success.message,
      };
      const newPipeline = serviceMap.pipelines[e.target.value]?.pipeline;
      opModal.value = {
        ...opModal.value,
        attachedPipeline: newPipeline,
        attach: false,
      };

      opUpdateSignal.value = {
        audience,
        attachedPipeline: newPipeline,
      };
    }
  };
  return (
    <div class="mt-[100px]">
      <div class="w-[200px] bg-white divide-gray-100 rounded-md shadow-lg border max-h-[400px] overflow-auto">
        <form onSumbit={attachPipeline}>
          <ul
            class="pt-2 text-sm text-gray-700 divide-y"
            aria-labelledby="dropdownDefaultButton"
          >
            {sorted?.map((
              p: PipelineInfo,
              i: number,
            ) => (
              <div class="flex items-center py-2 px-2 hover:bg-purple-50">
                <input
                  id={`default-radio-${i}`}
                  type="radio"
                  value={p.pipeline.id}
                  onChange={attachPipeline}
                  checked={p.pipeline.id ===
                    attachedPipeline?.id}
                  name="pipelineId"
                  className={`w-4 h-4 bg-gray-100 checked:bg-purple-500 cursor-pointer`}
                />
                <label
                  htmlFor={`default-radio-${i}`}
                  className="ml-2 text-xs font-medium text-gray-900"
                >
                  {p.pipeline.name}
                </label>
              </div>
            ))}
            <div class="flex items-center justify-center hover:bg-purple-50 py-2">
              <a href="/pipelines">
                <div class={"flex justify-between items-center"}>
                  <p class={"text-xs text-gray-600"}>
                    Create new pipeline
                  </p>
                  <IconPlus class={"w-3 h-3 ml-3"} />
                </div>
              </a>
            </div>
          </ul>
        </form>
      </div>
    </div>
  );
};