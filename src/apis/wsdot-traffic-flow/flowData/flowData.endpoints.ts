import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  trafficFlowByIdInputSchema,
  trafficFlowsInputSchema,
} from "./flowData.input";
import { flowDataSchema } from "./flowData.output";

export const flowDataGroup = defineEndpointGroup({
  name: "flow-data",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each FlowData item represents real-time traffic flow information from sensor stations across Washington state. Data includes traffic conditions, station locations, timestamps, and regional maintenance information for traffic monitoring.",
    businessContext:
      "Use to monitor current traffic conditions by providing real-time flow data and station information for traffic management and traveler information systems.",
  },
});

export const fetchTrafficFlows = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: flowDataGroup,
  functionName: "fetchTrafficFlows",
  endpoint: "/getTrafficFlowsAsJson",
  inputSchema: trafficFlowsInputSchema,
  outputSchema: flowDataSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple FlowData items for all traffic flow stations across Washington state.",
});

export const fetchTrafficFlowById = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: flowDataGroup,
  functionName: "fetchTrafficFlowById",
  endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
  inputSchema: trafficFlowByIdInputSchema,
  outputSchema: flowDataSchema,
  sampleParams: { FlowDataID: 2482 },
  endpointDescription:
    "Returns a single FlowData item for a specific traffic flow station by FlowDataID.",
});
