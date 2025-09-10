import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getScheduleTodayByRoute */
export const getScheduleTodayByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetScheduleTodayByRoute params type */
export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

/** Endpoint definition for getScheduleTodayByRoute */
export const getScheduleTodayByRouteDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleTodayByRoute",
  endpoint:
    "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}",
  inputSchema: getScheduleTodayByRouteParamsSchema,
  outputSchema: scheduleResponseSchema,
  sampleParams: { tripDate: getSampleDates().tomorrow, routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
