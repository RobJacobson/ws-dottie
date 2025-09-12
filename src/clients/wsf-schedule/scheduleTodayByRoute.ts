import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleTodayByRoute */
const getScheduleTodayByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** GetScheduleTodayByRoute params type */

/** Endpoint definition for getScheduleTodayByRoute */
export const getScheduleTodayByRouteDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTodayByRoute",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{routeId}/{onlyRemainingTimes}",
  inputSchema: getScheduleTodayByRouteParamsSchema,
  outputSchema: scheduleResponseSchema,
  sampleParams: { routeId: 1, onlyRemainingTimes: false },
  cacheStrategy: "DAILY_STATIC",
});
