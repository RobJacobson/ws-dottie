import { createApiDefinition } from "../utils";
import {
  getTrafficFlowInputSchema,
  getTrafficFlowsInputSchema,
} from "./original/inputSchemas.original";
import {
  flowDataListSchema,
  flowDataSchema,
} from "./original/outputSchemas.original";

export const wsdotTrafficFlowApi = createApiDefinition("wsdot-traffic-flow", [
  {
    function: "getTrafficFlow",
    endpoint:
      "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson",
    inputSchema: getTrafficFlowsInputSchema,
    outputSchema: flowDataListSchema,
    sampleParams: {},
    cacheStrategy: "FREQUENT",
  },
  {
    function: "getTrafficFlowById",
    endpoint:
      "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowAsJson?FlowDataID={FlowDataID}",
    inputSchema: getTrafficFlowInputSchema,
    outputSchema: flowDataSchema,
    sampleParams: { FlowDataID: 2482 },
    cacheStrategy: "FREQUENT",
  },
]);
