import { z } from "zod";
import { scheduledRoutesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduledRoutesBySeason */
const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

/** GetScheduledRoutesBySeason params type */
export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

/** Endpoint definition for getScheduledRoutesBySeason */
export const getScheduledRoutesBySeasonDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduledRoutesBySeason",
  endpoint: "/ferries/api/schedule/rest/schedroutes/{seasonId}",
  inputSchema: getScheduledRoutesBySeasonParamsSchema,
  outputSchema: scheduledRoutesArraySchema,
  sampleParams: { seasonId: 192 },
  cacheStrategy: "DAILY_STATIC",
});
