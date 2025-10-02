import { createApiDefinition } from "../utils";
import {
  getClearancesByRouteInputSchema,
  getClearancesInputSchema,
} from "./original/inputSchemas.original";
import { bridgeDataGISListSchema } from "./original/outputSchemas.original";

export const wsdotBridgeClearancesApi = createApiDefinition(
  "wsdot-bridge-clearances",
  [
    {
      function: "getBridgeClearances",
      endpoint: "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson",
      inputSchema: getClearancesInputSchema,
      outputSchema: bridgeDataGISListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getBridgeClearancesByRoute",
      endpoint:
        "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={Route}",
      inputSchema: getClearancesByRouteInputSchema,
      outputSchema: bridgeDataGISListSchema,
      sampleParams: { Route: "005" },
      cacheStrategy: "STATIC",
    },
  ]
);
