import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./flowData.input";
import * as o from "./flowData.output";

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
      inputSchema: i.getTrafficFlowsSchema,
      outputSchema: z.array(o.flowDataSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple FlowData items for all traffic flow stations across Washington state.",
    } satisfies EndpointDefinition<i.GetTrafficFlowsInput, o.FlowData[]>,
    getTrafficFlowById: {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: i.getTrafficFlowSchema,
      outputSchema: o.flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      endpointDescription:
        "Returns a single FlowData item for a specific traffic flow station by FlowDataID.",
    } satisfies EndpointDefinition<i.GetTrafficFlowInput, o.FlowData>,
  },
} satisfies EndpointGroup;
