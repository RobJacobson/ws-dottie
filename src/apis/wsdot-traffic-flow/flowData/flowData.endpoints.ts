import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type { TrafficFlowByIdInput, TrafficFlowsInput } from "./flowData.input";
import {
  trafficFlowByIdInputSchema,
  trafficFlowsInputSchema,
} from "./flowData.input";
import type { FlowData } from "./flowData.output";
import { flowDataSchema } from "./flowData.output";

export const flowDataGroup = {
  name: "flow-data",
  documentation: {
    resourceDescription:
      "Each FlowData item represents real-time traffic flow information from sensor stations across Washington state. Data includes traffic conditions, station locations, timestamps, and regional maintenance information for traffic monitoring.",
    businessContext:
      "Use to monitor current traffic conditions by providing real-time flow data and station information for traffic management and traveler information systems.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTrafficFlows: {
      function: "getTrafficFlows",
      endpoint: "/getTrafficFlowsAsJson",
      inputSchema: trafficFlowsInputSchema,
      outputSchema: z.array(flowDataSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple FlowData items for all traffic flow stations across Washington state.",
    } satisfies EndpointDefinition<TrafficFlowsInput, FlowData[]>,
    getTrafficFlowById: {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: trafficFlowByIdInputSchema,
      outputSchema: flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      endpointDescription:
        "Returns a single FlowData item for a specific traffic flow station by FlowDataID.",
    } satisfies EndpointDefinition<TrafficFlowByIdInput, FlowData>,
  },
} satisfies EndpointGroup;
