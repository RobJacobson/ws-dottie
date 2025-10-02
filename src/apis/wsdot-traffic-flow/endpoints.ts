import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotTrafficFlowApi = createApiDefinition("wsdot-traffic-flow", [
  {
    function: "getTrafficFlow",
    endpoint:
      "/Traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
    inputSchema: input.getTrafficFlowsSchema,
    outputSchema: output.flowDataListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTrafficFlowById",
    endpoint:
      "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?FlowDataID={FlowDataID}",
    inputSchema: input.getTrafficFlowSchema,
    outputSchema: output.flowDataSchema,
    sampleParams: { FlowDataID: 2482 },
    cacheStrategy: "FREQUENT",
  },
]);
