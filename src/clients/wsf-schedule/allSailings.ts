import { z } from "zod";

import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getAllSailings */
const allSailingsInput = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a scheduled route."),
  /** Parameter Y for the request. */
  Y: z.number().int().describe("Parameter Y for the request."),
});

/** Endpoint metadata for getAllSailings */
export const getAllSailingsMeta: EndpointDefinition<
  AllSailingsInput,
  SailingResponse[]
> = {
  api: "wsf-schedule",
  function: "allSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{SchedRouteID}/{Y}",
  inputSchema: allSailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { SchedRouteID: 2327, Y: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type AllSailingsInput = z.infer<typeof allSailingsInput>;
