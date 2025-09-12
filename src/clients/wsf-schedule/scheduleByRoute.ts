import { z } from "zod";
import { scheduleResponseSingleSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getScheduleByRoute */
const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** GetScheduleByRoute params type */

/** Endpoint definition for getScheduleByRoute */
export const getScheduleByRouteDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}",
  inputSchema: getScheduleByRouteParamsSchema,
  outputSchema: scheduleResponseSingleSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
});
