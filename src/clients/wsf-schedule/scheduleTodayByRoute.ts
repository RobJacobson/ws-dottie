import { z } from "zod";
import { scheduleTodayResponseSchema } from "@/schemas/wsf-schedule";
import type { ScheduleTodayResponse } from "@/schemas/wsf-schedule/scheduleTodayResponse.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByRoute */
const scheduleTodayByRouteInput = z.object({
  routeId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByRoute */
export const getScheduleTodayByRouteMeta: Endpoint<
  ScheduleTodayByRouteInput,
  ScheduleTodayResponse
> = {
  api: "wsf-schedule",
  function: "getScheduleTodayByRoute",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{routeId}/{onlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteInput,
  outputSchema: scheduleTodayResponseSchema,
  sampleParams: { routeId: 1, onlyRemainingTimes: false },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteInput
>;
