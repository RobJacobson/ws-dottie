import { z } from "zod";
import { sailingResponsesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getAllSailings */
const allSailingsInput = z.object({
  schedRouteId: z.number().int().positive(),
});

/** Endpoint metadata for getAllSailings */
export const getAllSailingsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getAllSailings",
  endpoint: "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  inputSchema: allSailingsInput,
  outputSchema: sailingResponsesSchema,
  sampleParams: { schedRouteId: 2327 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type AllSailingsInput = z.infer<typeof allSailingsInput>;
