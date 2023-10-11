import { BetaTag, ComingSoonTag } from "../components/icons/featureTags.tsx";
import IconPlus from "tabler-icons/tsx/plus.tsx";
import { opModal } from "../components/serviceMap/opModalSignal.ts";
import IconPlayerPause from "tabler-icons/tsx/player-pause.tsx";
import { Tooltip } from "../components/tooltip/tooltip.tsx";
import IconUnlink from "tabler-icons/tsx/unlink.tsx";
import IconLink from "tabler-icons/tsx/link.tsx";
import { OddAttachModal } from "../components/modals/oddAttachModal.tsx";
import { Toggle } from "../components/form/switch.tsx";
import { OperationActionMenu } from "../components/operation/operationActionMenu.tsx";
import {
  tailEnabledSignal,
  tailSamplingRateSignal,
  tailSamplingSignal,
} from "./tail.tsx";
import { isNumeric } from "../lib/utils.ts";
import IconWindowMaximize from "tabler-icons/tsx/window-maximize.tsx";
import hljs from "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/es/highlight.min.js";
import { ClientInfo } from "streamdal-protos/protos/sp_info.ts";
import { useState } from "preact/hooks";
import { Schema } from "../components/operation/schema.tsx";

export const OperationOpModalInfo = (
  {
    serviceMap,
    attachedPipeline,
    setTailNavOpen,
    tailNavOpen,
    schemaModalOpen,
    setSchemaModalOpen,
    clients,
  }: {
    serviceMap: ServiceMapType;
    attachedPipeline: Pipeline;
    setTailNavOpen: () => void;
    tailNavOpen: boolean;
    schemaModalOpen: boolean;
    setSchemaModalOpen: () => void;
    clients: ClientInfo[];
  },
) => {
  const [attachSelectOpen, setAttachSelectOpen] = useState(false);

  const handleAttachOpen = () => {
    setAttachSelectOpen(!attachSelectOpen);
  };

  return (
    <>
      <div class="px-4 py-4 rounded-md mx-2">
        <div class="mb-2 flex items-center pr-2">
          <h3 class="text-web font-bold text-sm">
            Pipelines
          </h3>
          <BetaTag class={"ml-2"} />
        </div>
        {!serviceMap?.pipes.length
          ? (
            <a href={"/pipelines"}>
              <button class="text-streamdalPurple border border-purple-600 bg-purple-50 font-semibold rounded-lg w-full flex justify-center text-sm px-2 py-1 text-center inline-flex items-center">
                <IconPlus class="w-4 h-4 mr-1" />
                Create a new pipeline
              </button>
            </a>
          )
          : attachedPipeline
          ? (
            <div
              className={`flex justify-between items-center text-web bg-purple-50 border border-purple-600 font-medium rounded-md w-full text-sm px-2 text-xs py-1 focus:ring-1 focus:outline-none focus:ring-purple-600`}
            >
              {attachedPipeline?.name}
              <OperationActionMenu />
            </div>
          )
          : (
            <button
              id="attach-pipeline"
              className="text-web font-semibold bg-purple-50 border border-purple-600 hover:border-[#8E84AD] font-medium rounded-md w-full flex justify-between text-sm px-2 text-xs py-1 text-center inline-flex items-center focus:ring-1 focus:outline-none focus:ring-purple-600 active:ring-1 active:outline-none active:ring-purple-600"
              type="button"
              onClick={() => handleAttachOpen()}
            >
              Attach a pipeline
              <IconLink class="w-4" />
            </button>
          )}
        {attachSelectOpen && (
          <OddAttachModal
            serviceMap={serviceMap}
            setAttachSelectOpen={setAttachSelectOpen}
            attachSelectOpen={attachSelectOpen}
          />
        )}
      </div>
      <div
        id="pipeline-attach-detach"
        data-accordion="open"
        data-active-classes="bg-blue-100 text-blue-600"
        class="py-2"
      >
        <h3 id="collapse-heading-2">
          <button
            type="button"
            className={`flex items-center w-full px-5 border-y border-purple-100 py-3 font-medium text-left text-web `}
            data-accordion-target="#collapse-body-2"
            aria-expanded="true"
            aria-controls="collapse-body-2"
            onClick={() => setTailNavOpen(!tailNavOpen)}
          >
            <h3 class="text-sm font-semibold ml-3">
              Tail
            </h3>
          </button>
        </h3>
        <div
          id="collapse-body-2"
          class={`border-b border-purple-100 pl-7 ${
            tailNavOpen ? "" : "hidden"
          }`}
          aria-labelledby="collapse-heading-2"
        >
          <div class="text-cobweb font-medium text-xs my-3">
            {clients
              ? "View your pipeline data in realtime"
              : "You must attach a client first"}
          </div>
          {clients && (
            <div class="flex flex-col">
              <div class="flex flex-row justify-start items-center mb-3">
                <Toggle
                  label="Sampling"
                  value={tailSamplingSignal.value}
                  setValue={(value) => tailSamplingSignal.value = value}
                />
                {tailSamplingSignal.value &&
                  (
                    <label className="relative inline-flex items-center cursor-pointer ml-2">
                      <span className="mr-3 text-[12px] font-[500] leading-[20px] text-cobweb">
                        Sample Setting
                      </span>

                      <input
                        class={`w-[${
                          (String(
                            tailSamplingRateSignal.value,
                          )
                            .length) * 12
                        }px] mr-2`}
                        value={tailSamplingRateSignal
                          .value}
                        onChange={(e) => {
                          if (isNumeric(e.target.value)) {
                            tailSamplingRateSignal.value = e.target.value;
                          }
                        }}
                      />
                      <span className="mr-3 text-[12px] font-[500] leading-[20px] text-cobweb">
                        /s
                      </span>
                    </label>
                  )}
              </div>
              <button
                onClick={() =>
                  tailEnabledSignal.value = !tailEnabledSignal
                    .value}
                className={`text-white bg-web rounded-md w-[260px] h-[34px] flex justify-center items-center font-medium text-sm mb-4 cursor-pointer`}
              >
                {tailEnabledSignal.value ? "Stop Tail" : "Start Tail"}
              </button>
            </div>
          )}
        </div>
        <h3 id="collapse-heading-3">
          <button
            type="button"
            className="flex items-center border-b border-purple-100 w-full px-5 py-3 font-medium text-left text-gray-500 focus:ring-2"
            data-accordion-target="#collapse-body-3"
            aria-expanded="false"
            aria-controls="collapse-body-3"
          >
            <h3 class="text-gray-400 text-sm font-semibold ml-3">
              Notifications
            </h3>
            <ComingSoonTag class={"ml-2"} />
          </button>
        </h3>
        <div
          id="collapse-body-3"
          class="hidden"
          aria-labelledby="collapse-heading-3"
        >
          <div class="p-5">
            <p class="text-gray-300 text-xs">
              Notifications coming soon...
            </p>
          </div>
        </div>
        <h3 id="collapse-heading-4">
          <button
            type="button"
            className="flex items-center w-full px-5 border-b border-purple-100 py-3 font-medium text-left text-web focus:ring-2"
            data-accordion-target="#collapse-body-4"
            aria-expanded="false"
            aria-controls="collapse-body-4"
          >
            <h3 class="text-gray-400 text-sm font-semibold ml-3">
              Trends
            </h3>
            <ComingSoonTag class={"ml-2"} />
          </button>
        </h3>
        <div
          id="collapse-body-4"
          class="hidden"
          aria-labelledby="collapse-heading-4"
        >
          <p class="p-5 text-gray-300 text-xs">
            Trends coming soon...
          </p>
        </div>
        <h3 id="collapse-heading-5">
          <button
            type="button"
            className={`flex items-center w-full px-5 border-purple-100 py-3 font-medium text-left text-web`}
            data-accordion-target="#collapse-body-5"
            aria-expanded="true"
            aria-controls="collapse-body-5"
          >
            <h3
              className={"text-web text-sm font-semibold ml-3"}
            >
              Schema
            </h3>
            <BetaTag class={"ml-2"} />
          </button>
        </h3>
        <div
          id="collapse-body-5"
          aria-labelledby="collapse-heading-5"
          class={"flex flex-col items-center justify-center p-4"}
        >
          {!schemaModalOpen && (
            <Schema setSchemaModalOpen={setSchemaModalOpen} />
          )}
        </div>
      </div>
    </>
  );
};
