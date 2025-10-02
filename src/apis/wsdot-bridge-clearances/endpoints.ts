import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotBridgeClearancesApi = createApiDefinition(
  "wsdot-bridge-clearances",
  [
    {
      function: "getBridgeClearances",
      endpoint: "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson",
      inputSchema: input.getClearancesSchema,
      outputSchema: output.bridgeDataGISListSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "getBridgeClearancesByRoute",
      endpoint:
        "/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?Route={Route}",
      inputSchema: input.getClearancesByRouteSchema,
      outputSchema: output.bridgeDataGISListSchema,
      sampleParams: { Route: "005" },
      cacheStrategy: "STATIC",
    },
  ]
);
