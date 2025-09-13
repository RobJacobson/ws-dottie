import { z } from "zod";
import { sailingResponsesSchema } from "@/schemas/wsf-schedule";

/** Input schema for getSailings */
const sailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getSailings */
export const getSailingsMeta = {
  api: "wsf-schedule",
  function: "getSailings",
  endpoint: "/ferries/api/schedule/rest/sailings/{schedRouteId}",
  inputSchema: sailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type SailingsInput = z.infer<typeof sailingsInput>;
