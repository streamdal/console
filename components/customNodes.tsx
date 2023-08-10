import { Handle, Position } from "reactflow";
import { NodeMenu, ServiceNodeMenu } from "./rules/participantsMenu.tsx";
import IconGripVertical from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/grip-vertical.tsx";
import "flowbite";
import "twind";
import { useState } from "https://esm.sh/stable/preact@10.15.1/denonext/hooks.js";
import { ConsumerIcon } from "./icons/consumer.tsx";
import { ProducerIcon } from "./icons/producer.tsx";
import { PipelineInfo } from "snitch-protos/protos/info.ts";

type ExtendedParams = {
  service: string;
  component: string;
  operationType: string;
};

type ActorNodeData = {
  label: string;
  source?: string;
  target?: string;
  instances?: number;
  pipeline: PipelineInfo;
  flow?: boolean;
  params?: ExtendedParams;
};

export const Service = ({ data }: { data: { label: string } }) => {
  return (
    <div class="h-[100px]">
      <div class="h-[80px] w-[320px] flex items-center justify-between bg-white rounded-lg shadow-lg z-10 border-1 border-purple-200 px-2">
        <IconGripVertical
          class="w-6 h-6 text-purple-100 cursor-grab"
          id="dragHandle"
        />
        <img
          src={"/images/placeholder-icon.png"}
          className={"h-[40px]"}
        />
        <div>
          <h2 className={"text-lg mr-3 ml-2"}>{data.label}</h2>
          <p class="text-streamdalPurple text-xs font-semibold mt-1">
            4 instances
          </p>
        </div>
        <ServiceNodeMenu />
      </div>
      <span class="sr-only">Notifications</span>

      <div className={"flex justify-evenly w-1/2 mt-2"}>
        <Handle
          type="target"
          id="c"
          position={Position.Bottom}
          style={{ opacity: 0, background: "#FFFFFF", position: "relative" }}
        />
        <Handle
          type="source"
          id="d"
          position={Position.Bottom}
          style={{ opacity: 0, background: "#FFFFFF", position: "relative" }}
        />
      </div>
    </div>
  );
};

export const Producer = ({ data }: { data: ActorNodeData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="h-[96px] flex items-center z-40">
      <div
        data-popover-target="popover"
        data-popover-trigger="hover"
        type="button"
        onClick={handleModalOpen}
        className="w-[250px] h-[64px] bg-white rounded-lg shadow-lg border-1 border-purple-200 flex items-center justify-between px-1"
      >
        <IconGripVertical
          class={`w-6 h-6 text-purple-100 ${!data.params && "cursor-grab"}`}
          id="dragHandle"
        />
        <ProducerIcon className={"mr-2"} />
        {data.pipeline.audience && (
          <a
            href={`/service/${
              encodeURIComponent(data.pipeline.audience.serviceName)
            }/component/${
              encodeURIComponent(data.pipeline.audience.componentName)
            }/${
              data.pipeline.audience.operationType === 1
                ? "consumer"
                : "producer"
            }/${
              data?.params
                ? `op/${
                  encodeURIComponent(data.pipeline.audience.operationName)
                }`
                : "all"
            }`}
          >
            <div className={"flex flex-col p-1"}>
              <h2 className={"text-[16px]"}>
                {data.label}
              </h2>
              <h3 class="text-xs text-gray-500">Producer</h3>
            </div>
          </a>
        )}
        <NodeMenu data={data.pipeline} />
      </div>
      {!data.params && (
        <div
          data-popover
          id="popover"
          role="tooltip"
          class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Popover no arrow
            </h3>
          </div>
          <div class="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
          </div>
        </div>
      )}
      <span class="sr-only">Notifications</span>
      {data.instances && (
        <div class="absolute inline-flex items-center justify-evenly w-7 h-7 text-xs text-white bg-purple-500 rounded-full top-1 -right-2 dark:border-gray-900">
          {data.instances}
        </div>
      )}
      {!data.params && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ opacity: 0 }}
        />
      )}
      {!data.params && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export const Consumer = ({ data }: { data: ActorNodeData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  return (
    <div className="h-[96px] flex items-center">
      <div
        data-popover-target="popover"
        data-popover-trigger="hover"
        type="button"
        onClick={handleModalOpen}
        className="w-[250px] h-[64px] bg-white rounded-lg shadow-lg border-1 border-purple-200 flex items-center justify-between px-1"
      >
        <IconGripVertical
          class={`w-6 h-6 text-purple-100 ${!data.params && "cursor-grab"}`}
          id="dragHandle"
        />

        <ConsumerIcon className={"mr-2"} />
        {data.pipeline.audience && (
          <a
            href={`/service/${
              encodeURIComponent(data.pipeline.audience.serviceName)
            }/component/${
              encodeURIComponent(data.pipeline.audience.componentName)
            }/${
              data.pipeline.audience.operationType === 1
                ? "consumer"
                : "producer"
            }/${
              data?.params
                ? `op/${
                  encodeURIComponent(data.pipeline.audience.operationName)
                }`
                : "all"
            }`}
          >
            <div className={"flex flex-col p-1"}>
              <h2 className={"text-[16px] text-center"}>
                {data.label}
              </h2>
              <h3 class="text-xs text-gray-500">Consumer</h3>
            </div>
          </a>
        )}
        <NodeMenu data={data.pipeline} />
      </div>
      {!data?.params && (
        <div
          data-popover
          id="popover"
          role="tooltip"
          class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
        >
          <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Popover no arrow
            </h3>
          </div>
          <div class="px-3 py-2">
            <p>And here's some amazing content. It's very engaging. Right?</p>
          </div>
        </div>
      )}
      <span class="sr-only">Notifications</span>
      {data.instances && (
        <div class="absolute inline-flex items-center justify-evenly w-7 h-7 text-xs text-white bg-purple-500 rounded-full top-1 -right-2 dark:border-gray-900">
          {data.instances}
        </div>
      )}
      {!data.params && (
        <Handle
          type="source"
          position={Position.Top}
          style={{ opacity: 0 }}
        />
      )}
      {!data.params && (
        <Handle
          type="target"
          position={Position.Bottom}
          style={{ opacity: 0 }}
        />
      )}
    </div>
  );
};

export const Component = ({ data }: { data: { label: string } }) => {
  return (
    <div
      className={"z-0 bg-web rounded-md border-1 border-black h-[145px] w-[145px] shadow-xl flex justify-center" +
        " items-center"}
    >
      <div className={"flex justify-center flex-col items-center"}>
        <img src={"/images/kafka-dark.svg"} className="w-[30px]" />
        <p className={"z-10 mt-2 text-white"}>{data?.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Left}
        id="a"
        style={{ opacity: 0 }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="b"
        style={{ opacity: 0 }}
      />
    </div>
  );
};
