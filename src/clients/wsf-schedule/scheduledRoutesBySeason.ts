import { z } from "zod";
import { scheduledRoutesSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduledRoutesBySeason */
const scheduledRoutesBySeasonInput = z.object({
  seasonId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduledRoutesBySeason */
export const getScheduledRoutesBySeasonMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduledRoutesBySeason",
  endpoint: "/ferries/api/schedule/rest/schedroutes/{seasonId}",
  inputSchema: scheduledRoutesBySeasonInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: { seasonId: 192 },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduledRoutesBySeasonInput = z.infer<
  typeof scheduledRoutesBySeasonInput
>;
