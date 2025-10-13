import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  name: "wsdot-border-crossings",
  baseUrl:
    "https://wsdot.wa.gov/Traffic/api/BorderCrossings/BorderCrossingsREST.svc",
  endpoints: [
    /**
     * BorderCrossingData response
     */
    {
      function: "getBorderCrossings",
      endpoint: "/GetBorderCrossingsAsJson",
      inputSchema: i.getBorderCrossingsSchema,
      outputSchema: z.array(o.borderCrossingDataSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<
      i.GetBorderCrossingsInput,
      o.BorderCrossingData[]
    >,
  ],
};
