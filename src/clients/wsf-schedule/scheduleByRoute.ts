import { z } from "zod";
import { scheduleResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getScheduleByRoute */
export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetScheduleByRoute params type */
export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

/** Endpoint definition for getScheduleByRoute */
export const getScheduleByRouteDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}",
  inputSchema: getScheduleByRouteParamsSchema,
  outputSchema: scheduleResponsesArraySchema,
  sampleParams: { tripDate: getSampleDates().tomorrow, routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
