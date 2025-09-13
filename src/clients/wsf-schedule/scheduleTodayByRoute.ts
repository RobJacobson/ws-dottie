import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByRoute */
const scheduleTodayByRouteInput = z.object({
  routeId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByRoute */
export const getScheduleTodayByRouteMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTodayByRoute",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{routeId}/{onlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: { routeId: 1, onlyRemainingTimes: false },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteInput
>;
