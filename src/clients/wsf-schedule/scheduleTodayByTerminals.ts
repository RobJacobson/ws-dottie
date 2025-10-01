import { z } from "zod";

import {
  type ScheduleTodayResponse,
  scheduleTodayResponseSchema,
} from "@/schemas/wsf-schedule/scheduleTodayResponse.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByScheduleTerminals */
const scheduleTodayByScheduleTerminalsInput = z.object({
  DepartingScheduleTerminalID: z.number().int().positive(),
  ArrivingScheduleTerminalID: z.number().int().positive(),
  OnlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsMeta: EndpointDefinition<
  ScheduleTodayByScheduleTerminalsInput,
  ScheduleTodayResponse
> = {
  api: "wsf-schedule",
  function: "scheduleTodayByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{DepartingScheduleTerminalID}/{ArrivingScheduleTerminalID}/{OnlyRemainingTimes}",
  inputSchema: scheduleTodayByScheduleTerminalsInput,
  outputSchema: scheduleTodayResponseSchema,
  sampleParams: {
    DepartingScheduleTerminalID: 1,
    ArrivingScheduleTerminalID: 10,
    OnlyRemainingTimes: false,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type ScheduleTodayByScheduleTerminalsInput = z.infer<
  typeof scheduleTodayByScheduleTerminalsInput
>;
