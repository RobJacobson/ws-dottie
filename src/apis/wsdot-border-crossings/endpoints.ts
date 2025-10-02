import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotBorderCrossingsApi = createApiDefinition(
  "wsdot-border-crossings",
  [
    {
      function: "getBorderCrossings",
      endpoint:
        "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson",
      inputSchema: input.getBorderCrossingsSchema,
      outputSchema: output.borderCrossingDataListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
  ]
);
