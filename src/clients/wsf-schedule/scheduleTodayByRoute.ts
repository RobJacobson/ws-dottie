import { z } from "zod";

import {
  type ScheduleTodayResponse,
  scheduleTodayResponseSchema,
} from "@/schemas/wsf-schedule/scheduleTodayResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByRoute */
const scheduleTodayByRouteInput = z.object({
  RouteID: z.number().int().positive(),
  OnlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByRoute */
export const getScheduleTodayByRouteMeta: EndpointDefinition<
  ScheduleTodayByRouteInput,
  ScheduleTodayResponse
> = {
  api: "wsf-schedule",
  function: "scheduleTodayByRoute",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByRouteInput,
  outputSchema: scheduleTodayResponseSchema,
  sampleParams: { RouteID: 1, OnlyRemainingTimes: false },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteInput
>;
