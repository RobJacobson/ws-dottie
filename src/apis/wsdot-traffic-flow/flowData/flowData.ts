import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./flowData.input";
import * as o from "./flowData.output";

export const flowDataResource: EndpointGroup = {
  name: "flow-data",
  documentation: {
    resourceDescription:
      "FlowData represents real-time traffic flow information from sensors across the state. Data includes traffic conditions (WideOpen, Moderate, Heavy, StopAndGo), station locations, and timestamps. Data is updated every 90 seconds.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
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
        "Returns real-time traffic flow data for all stations across the state.",
    } satisfies EndpointDefinition<i.GetTrafficFlowsInput, o.FlowData[]>,
    getTrafficFlowById: {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: i.getTrafficFlowSchema,
      outputSchema: o.flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      endpointDescription:
        "Returns real-time traffic flow data for a specific station by FlowDataID.",
    } satisfies EndpointDefinition<i.GetTrafficFlowInput, o.FlowData>,
  },
};
