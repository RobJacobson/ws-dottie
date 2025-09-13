import { z } from "zod";
import { scheduleTodayResponseSchema, type ScheduleTodayResponse } from "@/schemas/wsf-schedule/scheduleTodayResponse.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByScheduleTerminals */
const scheduleTodayByScheduleTerminalsInput = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsMeta: Endpoint<
  ScheduleTodayByScheduleTerminalsInput,
  ScheduleTodayResponse
> = {
  api: "wsf-schedule",
  function: "getScheduleTodayByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}",
  inputSchema: scheduleTodayByScheduleTerminalsInput,
  outputSchema: scheduleTodayResponseSchema,
  sampleParams: {
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
    onlyRemainingTimes: false,
  },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleTodayByScheduleTerminalsInput = z.infer<
  typeof scheduleTodayByScheduleTerminalsInput
>;
