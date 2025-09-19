import { z } from "zod";

import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule/scheduleResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByRoute */
const scheduleByRouteInput = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByRoute */
export const getScheduleByRouteMeta: EndpointDefinition<
  ScheduleByRouteInput,
  ScheduleResponse
> = {
  id: "wsf-schedule/scheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedule/{tripDate}/{routeId}",
  inputSchema: scheduleByRouteInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow(), routeId: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleByRouteInput = z.infer<typeof scheduleByRouteInput>;
