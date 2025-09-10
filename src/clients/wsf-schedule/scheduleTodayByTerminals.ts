import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetScheduleTodayByScheduleTerminals params type */
export type GetScheduleTodayByScheduleTerminalsParams = z.infer<
  typeof getScheduleTodayByScheduleTerminalsParamsSchema
>;

/** Endpoint definition for getScheduleTodayByScheduleTerminals */
export const getScheduleTodayByScheduleTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleTodayByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}",
  inputSchema: getScheduleTodayByScheduleTerminalsParamsSchema,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});
