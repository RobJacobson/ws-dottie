import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  trafficFlowByIdInputSchema,
  trafficFlowsInputSchema,
} from "./flowData.input";
import { flowDataSchema } from "./flowData.output";

export const flowDataGroup: EndpointGroup = {
  name: "flow-data",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time traffic flow conditions from sensor stations across Washington state.",
    description:
      "Current traffic flow readings, station locations, and timestamps for traffic monitoring and congestion detection.",
    useCases: [
      "Monitor real-time traffic flow conditions across Washington highways.",
      "Detect congestion and traffic patterns for route planning.",
      "Display current traffic status in traveler information systems.",
    ],
    updateFrequency: "90s",
  },
};

export const fetchTrafficFlows = createEndpoint({
  api: apis.wsdotTrafficFlow,
  group: flowDataGroup,
  functionName: "fetchTrafficFlows",
  endpoint: "/getTrafficFlowsAsJson",
  inputSchema: trafficFlowsInputSchema,
  outputSchema: flowDataSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current traffic flow conditions for all stations statewide.",
});

export const fetchTrafficFlowById = createEndpoint({
  api: apis.wsdotTrafficFlow,
  group: flowDataGroup,
  functionName: "fetchTrafficFlowById",
  endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
  inputSchema: trafficFlowByIdInputSchema,
  outputSchema: flowDataSchema,
  sampleParams: { FlowDataID: 2482 },
  endpointDescription:
    "Get current traffic flow condition for a specific station by ID.",
});
