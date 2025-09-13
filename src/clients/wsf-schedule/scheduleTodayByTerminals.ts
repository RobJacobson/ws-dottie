import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Input schema for getScheduleTodayByScheduleTerminals */
const scheduleTodayByScheduleTerminalsInput = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** Endpoint metadata for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTodayByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}",
  inputSchema: scheduleTodayByScheduleTerminalsInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
    onlyRemainingTimes: false,
  },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleTodayByScheduleTerminalsInput = z.infer<
  typeof scheduleTodayByScheduleTerminalsInput
>;
