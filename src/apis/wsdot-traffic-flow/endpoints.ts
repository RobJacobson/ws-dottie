import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotTrafficFlowApi: ApiDefinition = {
  name: "wsdot-traffic-flow",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/trafficflow/trafficflowrest.svc",
  endpoints: [
    /**
     * FlowData response
     */
    {
      function: "getTrafficFlow",
      endpoint: "/getTrafficFlowsAsJson",
      inputSchema: i.getTrafficFlowsSchema,
      outputSchema: z.array(o.flowDataSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetTrafficFlowsInput, o.FlowData[]>,
    {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: i.getTrafficFlowSchema,
      outputSchema: o.flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetTrafficFlowInput, o.FlowData>,
  ],
};
