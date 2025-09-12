import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleTodayByScheduleTerminals */
const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
  onlyRemainingTimes: z.boolean(),
});

/** GetScheduleTodayByScheduleTerminals params type */

/** Endpoint definition for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTodayByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}",
  inputSchema: getScheduleTodayByScheduleTerminalsParamsSchema,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
    onlyRemainingTimes: false,
  },
  cacheStrategy: "DAILY_STATIC",
});
