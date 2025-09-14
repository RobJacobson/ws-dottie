import { z } from "zod";
import {
  type ScheduledRoute,
  scheduledRoutesSchema,
} from "@/schemas/wsf-schedule/scheduledRoute.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getScheduledRoutesBySeason */
const scheduledRoutesBySeasonInput = z.object({
  seasonId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduledRoutesBySeason */
export const getScheduledRoutesBySeasonMeta: EndpointMeta<
  ScheduledRoutesBySeasonInput,
  ScheduledRoute[]
> = {
  id: "wsf-schedule/scheduledRoutesBySeason",
  endpoint: "/ferries/api/schedule/rest/schedroutes/{seasonId}",
  inputSchema: scheduledRoutesBySeasonInput,
  outputSchema: scheduledRoutesSchema,
  sampleParams: { seasonId: 192 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduledRoutesBySeasonInput = z.infer<
  typeof scheduledRoutesBySeasonInput
>;
