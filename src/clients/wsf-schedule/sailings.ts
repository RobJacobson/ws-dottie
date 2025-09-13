import { z } from "zod";
import {
  type SailingResponse,
  sailingResponsesSchema,
} from "@/schemas/wsf-schedule/sailingResponse.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getSailings */
const sailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getSailings */
export const getSailingsMeta: Endpoint<SailingsInput, SailingResponse[]> = {
  endpoint: "/ferries/api/schedule/rest/sailings/{schedRouteId}",
  inputSchema: sailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type SailingsInput = z.infer<typeof sailingsInput>;
