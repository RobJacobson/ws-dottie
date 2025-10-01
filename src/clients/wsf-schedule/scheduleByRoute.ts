import { z } from "zod";

import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule/scheduleResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByRoute */
const scheduleByRouteInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  RouteID: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByRoute */
export const getScheduleByRouteMeta: EndpointDefinition<
  ScheduleByRouteInput,
  ScheduleResponse
> = {
  api: "wsf-schedule",
  function: "scheduleByRoute",
  endpoint: "/ferries/api/schedule/rest/schedule/{TripDate}/{RouteID}",
  inputSchema: scheduleByRouteInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleByRouteInput = z.infer<typeof scheduleByRouteInput>;
