import { Audience, OperationType } from "snitch-protos/protos/sp_common.ts";
import { Pipeline } from "snitch-protos/protos/sp_pipeline.ts";
import { ClientInfo } from "snitch-protos/protos/sp_info.ts";
import {
  audienceKey,
  componentKey,
  getAttachedPipeline,
  groupKey,
  operationKey,
  serviceKey,
} from "./utils.ts";
import { OpUpdate } from "../islands/serviceMap.tsx";
import { ServiceMapper } from "./serviceMapper.ts";
import {
  GROUP_MARGIN,
  GROUP_WIDTH,
} from "../components/serviceMap/customNodes.tsx";

export type Operation = {
  audience: Audience;
  attachedPipeline?: Pipeline;
  clients?: ClientInfo[];
};

export type NodeData = {
  audience: Audience;
  ops?: Operation[];
  serviceMap: ServiceMapper;
};

export type FlowNode = {
  id: string;
  type?: string;
  dragHandle?: string;
  draggable?: boolean;
  position?: {
    x: number;
    y: number;
  };
  sourcePosition?: string;
  targetPosition?: string;
  data: NodeData;
  parentNode?: string;
  extent?: string;
  style?: any;
};

export type FlowEdge = {
  id: string;
  source: string;
  target: string;
  markerEnd: any;
  type: string;
  style: any;
  data: any;
};

//
// This is heart of our homegrown layouts:
// * operationGroups max determines component node y axis offsets
// * group counts per service determine service node x axis offsets
// * group counts per component determine component node x axis offsets
export type NodesMap = {
  nodes: Map<string, FlowNode>;
  //
  // number is operation groups per component
  components: Map<string, number>;
  //
  // number is operation groups per service
  services: Map<string, number>;
  operationGroups: Map<string, number>;
};

//
// Start from the hard offset of all the previous group widths,
// then roughly center it in it's own group cluster
export const offset = (
  key: string,
  item: Map<string, number>,
) => {
  let offset = 0;
  for (const [k, v] of item) {
    if (k === key) {
      return offset +
        ((item.get(key) || 1) * (GROUP_WIDTH + GROUP_MARGIN) / 2);
    }
    offset += v * GROUP_WIDTH + GROUP_MARGIN;
  }
  return offset ? offset : 25;
};

export const mapOperation = (
  nodesMap: NodesMap,
  a: Audience,
  serviceMap: ServiceMapper,
) => {
  const gKey = groupKey(a);
  nodesMap.operationGroups.set(
    gKey,
    (nodesMap.operationGroups.get(gKey) || 0) + 1,
  );
  const op = OperationType[a.operationType].toLowerCase();
  const node = nodesMap.nodes.get(gKey);

  if (node) {
    nodesMap.nodes.set(gKey, {
      ...node,
      data: {
        ...node.data,
        ops: [...node.data.ops!, {
          audience: a,
          clients: serviceMap.liveAudiences.get(audienceKey(a)),
          attachedPipeline: getAttachedPipeline(
            a,
            serviceMap.pipelines,
            serviceMap.config,
          ),
        }] as Operation[],
      },
    });
  } else {
    const sKey = serviceKey(a);
    const cKey = componentKey(a);
    nodesMap.services.set(sKey, (nodesMap.services.get(sKey) || 0) + 1);
    nodesMap.components.set(cKey, (nodesMap.components.get(cKey) || 0) + 1);
    nodesMap.nodes.set(gKey, {
      id: gKey,
      type: `${op}Group`,
      dragHandle: "#dragHandle",
      position: {
        x: nodesMap.operationGroups.size === 1
          ? 25
          : (nodesMap.operationGroups.size - 1) * (GROUP_WIDTH + GROUP_MARGIN),
        y: 200,
      },
      data: {
        audience: a,
        ops: [{
          audience: a,
          clients: serviceMap.liveAudiences.get(audienceKey(a)),
          attachedPipeline: getAttachedPipeline(
            a,
            serviceMap.pipelines,
            serviceMap.config,
          ),
        }],
        serviceMap,
      },
    });
  }
};

export const mapNodes = (
  serviceMap: ServiceMapper,
): Map<string, FlowNode> => {
  const nodesMap: NodesMap = {
    nodes: new Map<string, FlowNode>(),
    components: new Map(),
    services: new Map(),
    operationGroups: new Map(),
  };

  serviceMap.audiences.sort((a, b) =>
    a.serviceName.localeCompare(b.serviceName) ||
    a.operationType - b.operationType
  ).forEach(
    (a: Audience) => {
      const sKey = serviceKey(a);
      const cKey = componentKey(a);

      nodesMap.nodes.set(sKey, {
        id: sKey,
        type: "service",
        dragHandle: "#dragHandle",
        position: {
          x: 25 + offset(
            sKey,
            nodesMap.services,
          ),
          y: 0,
        },
        data: { audience: a, serviceMap },
      });

      mapOperation(nodesMap, a, serviceMap);

      const max = Math.max(...Array.from(nodesMap.operationGroups.values()));

      nodesMap.nodes.set(cKey, {
        id: cKey,
        type: "component",
        dragHandle: "#dragHandle",
        position: {
          x: offset(cKey, nodesMap.components),
          y: 450 + (max - 1) * 76,
        },
        data: { audience: a, serviceMap },
      });
    },
  );

  return nodesMap.nodes;
};

//
// For each audience there are a pair of edges, one for each arrow:
// consumers: component -> consumer group -> service
// producers: component <- producer group <- service
export const mapEdgePair = (
  edgesMap: Map<string, FlowEdge>,
  a: Audience,
  audiences: Audience[],
): Map<string, FlowEdge> => {
  const op = OperationType[a.operationType].toLowerCase();
  edgesMap.set(`${componentKey(a)}-${groupKey(a)}-edge`, {
    id: `${componentKey(a)}-${groupKey(a)}-edge`,
    ...op === "consumer"
      ? {
        source: componentKey(a),
        target: groupKey(a),
      }
      : {
        source: groupKey(a),
        target: componentKey(a),
      },
    animated: true,
    markerEnd: {
      width: 20,
      height: 20,
      color: "#d2c1ff",
    },
    type: "interactiveEdge",
    style: {
      strokeWidth: 2,
      stroke: "#d2c1ff",
    },
    data: { audiences, a },
  });

  edgesMap.set(`${serviceKey(a)}-${groupKey(a)}-edge`, {
    id: `${serviceKey(a)}-${groupKey(a)}-edge`,
    ...op === "consumer"
      ? {
        source: groupKey(a),
        target: serviceKey(a),
      }
      : {
        source: serviceKey(a),
        target: groupKey(a),
      },
    animated: true,
    markerEnd: {
      width: 20,
      height: 20,
      color: "#d2c1ff",
    },
    type: "interactiveEdge",
    style: {
      strokeWidth: 2,
      stroke: "#d2c1ff",
    },
    data: { audiences, a },
  });
  return edgesMap;
};

export const mapEdges = (audiences: Audience[]): Map<string, FlowEdge> => {
  const edgesMap = new Map<string, FlowEdge>();
  audiences.forEach((a: Audience) => mapEdgePair(edgesMap, a, audiences));
  return edgesMap;
};

//
// Because reactflow doesn't work with ssr, some updates are made in
// unrouted modals client-side and those changes need to be reflected
// in the already rendered nodes
export const updateNode = (nodes: FlowNode[], update: OpUpdate) =>
  nodes.map((n: FlowNode) =>
    n.id ===
        operationKey(update.audience)
      ? {
        ...n,
        data: {
          ...n.data,
          attachedPipeline: update.attachedPipeline,
        },
      }
      : n
  );
