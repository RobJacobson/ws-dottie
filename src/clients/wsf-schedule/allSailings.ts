import { z } from "zod";

import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getAllSailings */
const allSailingsInput = z.object({
  /** Unique identifier for a scheduled route. */
  schedRouteId: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a scheduled route."),
  /** Parameter Y for the request. */
  y: z.number().int().describe("Parameter Y for the request."),
});

/** Endpoint metadata for getAllSailings */
export const getAllSailingsMeta: EndpointDefinition<
  AllSailingsInput,
  SailingResponse[]
> = {
  id: "wsf-schedule:allSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}/{y}",
  inputSchema: allSailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327, y: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type AllSailingsInput = z.infer<typeof allSailingsInput>;
