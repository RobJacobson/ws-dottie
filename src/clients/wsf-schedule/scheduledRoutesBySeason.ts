import { z } from "zod";
import { scheduledRoutesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduledRoutesBySeason */
export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

/** GetScheduledRoutesBySeason params type */
export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

/** Endpoint definition for getScheduledRoutesBySeason */
export const getScheduledRoutesBySeasonDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduledRoutesBySeason",
  endpoint: "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}",
  inputSchema: getScheduledRoutesBySeasonParamsSchema,
  outputSchema: scheduledRoutesArraySchema,
  sampleParams: { seasonId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
