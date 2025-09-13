import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByRoute */
const scheduleByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByRoute */
export const getScheduleByRouteMeta = {
  api: "wsf-schedule",
  function: "getScheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}",
  inputSchema: scheduleByRouteInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ScheduleByRouteInput = z.infer<typeof scheduleByRouteInput>;
