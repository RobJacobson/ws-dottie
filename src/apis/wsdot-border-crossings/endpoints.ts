import { createApiDefinition } from "../utils";
import { getBorderCrossingsInputSchema } from "./original/inputSchemas.original";
import { borderCrossingDataListSchema } from "./original/outputSchemas.original";

export const wsdotBorderCrossingsApi = createApiDefinition(
  "wsdot-border-crossings",
  [
    {
      function: "getBorderCrossings",
      endpoint:
        "/Traffic/api/BorderCrossings/BorderCrossingsREST.svc/GetBorderCrossingsAsJson",
      inputSchema: getBorderCrossingsInputSchema,
      outputSchema: borderCrossingDataListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
  ]
);
