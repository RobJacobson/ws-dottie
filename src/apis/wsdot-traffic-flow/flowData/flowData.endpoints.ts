import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTrafficFlowApi } from "../apiDefinition";
import {
  trafficFlowByIdInputSchema,
  trafficFlowsInputSchema,
} from "./flowData.input";
import { flowDataSchema } from "./flowData.output";

const group = defineEndpointGroup({
  api: wsdotTrafficFlowApi,
  name: "flow-data",
  documentation: {
    resourceDescription:
      "Each FlowData item represents real-time traffic flow information from sensor stations across Washington state. Data includes traffic conditions, station locations, timestamps, and regional maintenance information for traffic monitoring.",
    businessContext:
      "Use to monitor current traffic conditions by providing real-time flow data and station information for traffic management and traveler information systems.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchTrafficFlows = defineEndpoint({
  group,
  functionName: "fetchTrafficFlows",
  definition: {
    endpoint: "/getTrafficFlowsAsJson",
    inputSchema: trafficFlowsInputSchema,
    outputSchema: flowDataSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple FlowData items for all traffic flow stations across Washington state.",
  },
});

export const fetchTrafficFlowById = defineEndpoint({
  group,
  functionName: "fetchTrafficFlowById",
  definition: {
    endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
    inputSchema: trafficFlowByIdInputSchema,
    outputSchema: flowDataSchema,
    sampleParams: { FlowDataID: 2482 },
    endpointDescription:
      "Returns a single FlowData item for a specific traffic flow station by FlowDataID.",
  },
});

export const flowDataGroup = group.descriptor;
