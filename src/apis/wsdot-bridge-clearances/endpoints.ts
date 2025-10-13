import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  name: "wsdot-bridge-clearances",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpoints: [
    /**
     * BridgeDataGIS response
     */
    {
      function: "getBridgeClearances",
      endpoint: "/getClearancesAsJson",
      inputSchema: i.getClearancesSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.GetClearancesInput, o.BridgeDataGIS[]>,
    {
      function: "getBridgeClearancesByRoute",
      endpoint: "/getClearancesAsJson?Route={Route}",
      inputSchema: i.getClearancesByRouteSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: { Route: "005" },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.GetClearancesByRouteInput,
      o.BridgeDataGIS[]
    >,
  ],
};
