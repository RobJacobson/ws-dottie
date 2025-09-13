import { z } from "zod";
import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getAllSailings */
const allSailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getAllSailings */
export const getAllSailingsMeta: Endpoint<AllSailingsInput, SailingResponse[]> =
  {
    endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
    inputSchema: allSailingsInput,
    outputSchema: sailingResponsesSchema,
    sampleParams: { schedRouteId: 2327 },
    cacheStrategy: "DAILY_STATIC",
  };

// Type exports
export type AllSailingsInput = z.infer<typeof allSailingsInput>;
