import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import type { ScheduleResponse } from "@/schemas/wsf-schedule/scheduleResponse.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByRoute */
const scheduleByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByRoute */
export const getScheduleByRouteMeta: Endpoint<
  ScheduleByRouteInput,
  ScheduleResponse
> = {
  api: "wsf-schedule",
  function: "getScheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}",
  inputSchema: scheduleByRouteInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleByRouteInput = z.infer<typeof scheduleByRouteInput>;
