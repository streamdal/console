import { Handle, Position } from "reactflow";
import IconGripVertical from "tabler-icons/tsx/grip-vertical.tsx";
import IconDatabase from "tabler-icons/tsx/database.tsx";
import "twind";
import { OperationType } from "streamdal-protos/protos/sp_common.ts";
import { ServiceNodeMenu } from "../components/serviceMap/nodeMenu.tsx";
import { ProducerIcon } from "../components/icons/producer.tsx";
import { ConsumerIcon } from "../components/icons/consumer.tsx";
import {
  audienceKey,
  componentKey,
  serviceKey,
  setComponentGroup,
  setOperationHoverGroup,
  setServiceGroup,
  titleCase,
} from "../lib/utils.ts";
import { Tooltip } from "../components/tooltip/tooltip.tsx";
import { NodeData, Operation } from "../lib/nodeMapper.ts";
import { opModal } from "../components/serviceMap/opModalSignal.ts";
import IconTrash from "tabler-icons/tsx/trash.tsx";

export const GROUP_WIDTH = 280;
export const GROUP_MARGIN = 45;

export const ServiceNode = ({ data }: { data: NodeData }) => {
  const highlighted = data?.audience === opModal.value?.audience &&
    opModal.value?.displayType === "service";
  const setHover = () => {
    setServiceGroup(
      data.audience.serviceName,
      data.serviceMap.audiences,
      true,
    );
  };
  const resetHover = () => {
    setServiceGroup(
      data.audience.serviceName,
      data.serviceMap.audiences,
      false,
    );
  };

  return (
    <div
      onClick={() => {
        opModal.value = {
          audience: data.audience,
          displayType: "service",
        };
      }}
    >
      <div
        class={`min-h-[80px] w-[320px] flex items-center justify-between bg-white rounded-lg z-10 px-2 hover:border-purple-600 hover:shadow-lg ${
          highlighted
            ? "border-2 border-purple-600"
            : "border-1 border-purple-200"
        }`}
        onMouseOver={() => setHover()}
        onMouseLeave={() => resetHover()}
        id={`${serviceKey(data.audience)}-draghandle`}
      >
        <div class="flex flex-row items-center">
          <IconGripVertical class="w-6 h-6 text-purple-100 mr-1" />
          <img
            src={"/images/placeholder-icon.png"}
            className={"h-[40px]"}
          />
          <div class="flex flex-col ml-2">
            <h2 className={"text-lg"}>{data.audience.serviceName}</h2>
          </div>
        </div>
        <ServiceNodeMenu data={data} />
      </div>

      <div className={"flex justify-evenly w-1/2 mt"}>
        <Handle
          type="target"
          position={Position.Bottom}
          className="opacity-0 relative"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          className="opacity-0 relative"
        />
      </div>
    </div>
  );
};

export const GroupNode = ({ data }: { data: NodeData }) => {
  const op = OperationType[data.audience.operationType];
  const producer = op === OperationType[OperationType.PRODUCER];
  const setHover = () => {
    setOperationHoverGroup(data.audience, true);
  };

  const resetHover = () => {
    setOperationHoverGroup(data.audience, false);
  };

  return (
    <div
      className={`rounded-lg bg-sunset border border-purple-200 w-[${GROUP_WIDTH}px] pb-4 hover:shadow-lg hover:border-purple-600`}
      onMouseOver={() => setHover()}
      onMouseLeave={() => resetHover()}
    >
      <div id="dragHandle" class="flex flex-row items-center py-2">
        <IconGripVertical class="w-6 h-6 mx-2 text-purple-100 bg-white border border-purple-200" />
        {producer
          ? <ProducerIcon class="w-5 h-5 mr-2" />
          : <ConsumerIcon class="w-5 h-5 mr-2" />}
        {`${titleCase(op)}s`}
      </div>
      <div class="flex flex-col items-center justify-center mb w-full">
        {data.ops.map((o: Operation, i: number) => (
          <OperationNode
            operation={o}
            css={`${data.ops.length === i + 1 ? "" : "mb-2"}`}
          />
        ))}
      </div>
      <Handle
        type="source"
        position={producer ? Position.Bottom : Position.Top}
        className="opacity-0"
      />
      <Handle
        type="target"
        position={producer ? Position.Top : Position.Bottom}
        className="opacity-0"
      />
    </div>
  );
};

export const OperationNode = (
  { operation, css }: { operation: Operation; css: string },
) => {
  const key = audienceKey(operation.audience);
  const highlight = opModal.value?.audience &&
    key === audienceKey(opModal.value?.audience);
  const trashActive = opModal.value?.delete;

  return (
    <div
      type="button"
      class={`flex items-center justify-between w-[260px] h-[64px] group bg-white rounded-lg shadow-lg ${
        highlight ? "border-2 border-purple-600" : "border-1 border-purple-200"
      } pl-1 pr-2 ${css}`}
    >
      <div
        class="whitespace-nowrap text-ellipsis overflow-hidden w-full"
        onClick={() =>
          opModal.value = {
            audience: operation.audience,
            displayType: "operation",
            attachedPipeline: operation.attachedPipeline,
            clients: operation.clients,
          }}
      >
        <div
          class={"flex flex-col justify-start p-1 cursor-pointer"}
        >
          <h2
            data-tooltip-target={key}
            class={"text-[16px] whitespace-nowrap text-ellipsis overflow-hidden"}
          >
            {operation.audience.operationName}
          </h2>
          <Tooltip
            targetId={key}
            message={"Click to attach and detach pipelines"}
          />
          <h3 class="text-xs text-streamdalPurple font-semibold">
            {`${operation.clients?.length || 0} attached client${
              operation.clients?.length !== 1 ? "s" : ""
            }`}
          </h3>
        </div>
      </div>
      <button
        onClick={() => {
          opModal.value = {
            audience: operation.audience,
            displayType: "operation",
            attachedPipeline: operation.attachedPipeline,
            clients: operation.clients,
            delete: true,
          };
        }}
        className={"p-2 rounded"}
      >
        <IconTrash
          class={`w-5 h-5 hover:text-streamdalRed invisible z-50 ${
            trashActive ? "text-streamdalRed" : "text-gray-300"
          } group-hover:visible ${highlight && "visible"}`}
        />
      </button>
    </div>
  );
};

export const ComponentImage = (
  { componentName, className }: { componentName: string; className: string },
) => {
  if (componentName.toLowerCase().includes("kafka")) {
    return (
      <img
        src={"/images/kafka-dark.svg"}
        className={className}
      />
    );
  }

  if (componentName.toLowerCase().includes("postgres")) {
    return (
      <img
        src={"/images/postgresql.svg"}
        className={className}
      />
    );
  }

  return <IconDatabase class="w-6 h-6" />;
};

export const ComponentNode = ({ data }: { data: NodeData }) => {
  const highlighted = data?.audience === opModal.value?.audience &&
    opModal.value?.displayType === "component";
  const setHover = () => {
    setComponentGroup(
      data.audience.componentName,
      data.serviceMap.audiences,
      true,
    );
  };
  const resetHover = () => {
    setComponentGroup(
      data.audience.componentName,
      data.serviceMap.audiences,
      false,
    );
  };

  const cKey = componentKey(data.audience);
  return (
    <div
      onClick={() => {
        opModal.value = {
          audience: data.audience,
          displayType: "component",
        };
      }}
    >
      <div className={"flex w-1/2 justify-between mb"}>
        <Handle
          type="source"
          position={Position.Top}
          className="opacity-0 relative"
        />
        <Handle
          type="target"
          position={Position.Top}
          className="opacity-0 relative"
        />
      </div>
      <div
        id={`${cKey}-dragHandle`}
        class={`z-0 flex justify-center items-center bg-web rounded-md hover:shadow-xl hover:border-4 hover:border-purple-600 h-[145px] w-[145px] ${
          highlighted && "border-4 border-purple-600"
        }`}
        onMouseOver={() => setHover()}
        onMouseLeave={() => resetHover()}
      >
        <div class="flex justify-center flex-col items-center">
          <ComponentImage
            componentName={data.audience.componentName}
            className={"w-[30px]"}
          />
          <p class={"z-10 mt-2 text-white"}>{data.audience.componentName}</p>
        </div>
      </div>
    </div>
  );
};
