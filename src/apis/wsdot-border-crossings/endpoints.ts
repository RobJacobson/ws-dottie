import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotBorderCrossingsApi: ApiDefinition = {
  name: "wsdot-border-crossings",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/bordercrossings/bordercrossingsrest.svc",
  endpoints: [
    /**
     * BorderCrossingData response
     */
    {
      function: "getBorderCrossings",
      endpoint: "/getBorderCrossingsAsJson",
      inputSchema: i.getBorderCrossingsSchema,
      outputSchema: z.array(o.borderCrossingDataSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    } satisfies EndpointDefinition<
      i.GetBorderCrossingsInput,
      o.BorderCrossingData[]
    >,
  ],
};
