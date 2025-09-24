import { z } from "zod";

import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getAllSailings */
const allSailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getAllSailings */
export const getAllSailingsMeta: EndpointDefinition<
  AllSailingsInput,
  SailingResponse[]
> = {
  id: "wsf-schedule:allSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  inputSchema: allSailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "STATIC",
};

// Type exports
export type AllSailingsInput = z.infer<typeof allSailingsInput>;
