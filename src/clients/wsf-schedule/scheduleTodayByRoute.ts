import { z } from "zod";
import {
  type ScheduleTodayResponse,
  scheduleTodayResponseSchema,
} from "@/schemas/wsf-schedule/scheduleTodayResponse.zod";
import type { EndpointMeta } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByRoute */
const scheduleTodayByRouteInput = z.object({
  routeId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByRoute */
export const getScheduleTodayByRouteMeta: EndpointMeta<
  ScheduleTodayByRouteInput,
  ScheduleTodayResponse
> = {
  id: "wsf-schedule/scheduleTodayByRoute",
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
