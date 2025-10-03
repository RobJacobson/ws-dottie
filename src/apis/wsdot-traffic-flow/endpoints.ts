import type { ApiDefinition } from "@/apis/types";
import { input, output } from "./schemas";

export const wsdotTrafficFlowApi: ApiDefinition = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  endpoints: [
    {
      function: "getTrafficFlow",
      endpoint: "/getTrafficFlowsAsJson",
      inputSchema: input.getTrafficFlowsSchema,
      outputSchema: output.flowDataListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: input.getTrafficFlowSchema,
      outputSchema: output.flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      cacheStrategy: "FREQUENT",
    },
  ],
};
