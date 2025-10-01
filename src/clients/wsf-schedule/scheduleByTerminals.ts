import { z } from "zod";

import {
  type ScheduleResponse,
  scheduleResponseSchema,
} from "@/schemas/wsf-schedule/scheduleResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByTerminals */
const scheduleByTerminalsInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DepartingScheduleTerminalID: z.number().int().positive(),
  ArrivingScheduleTerminalID: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByTerminals */
export const getScheduleByTerminalsMeta: EndpointDefinition<
  ScheduleByTerminalsInput,
  ScheduleResponse
> = {
  api: "wsf-schedule",
  function: "scheduleByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/schedule/{TripDate}/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID}",
  inputSchema: scheduleByTerminalsInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingScheduleTerminalID: 1,
    ArrivingScheduleTerminalID: 10,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleByTerminalsInput = z.infer<typeof scheduleByTerminalsInput>;
