import type { ApiDefinition } from "@/shared/endpoints";
import { input, output } from "./schemas";

export const wsdotBridgeClearancesApi: ApiDefinition = {
  name: "wsdot-bridge-clearances",
  baseUrl: "http://www.wsdot.wa.gov/traffic/api/bridges/clearancerest.svc",
  endpoints: [
    {
      function: "getBridgeClearances",
      endpoint: "/getClearancesAsJson",
      inputSchema: input.getClearancesSchema,
      outputSchema: output.bridgeDataGISListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getBridgeClearancesByRoute",
      endpoint: "/getClearancesAsJson?Route={Route}",
      inputSchema: input.getClearancesByRouteSchema,
      outputSchema: output.bridgeDataGISListSchema,
      sampleParams: { Route: "005" },
      cacheStrategy: "STATIC",
    },
  ],
};
