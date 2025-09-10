import { z } from "zod";
import { scheduleResponsesArraySchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getScheduleByScheduleTerminals */
export const getScheduleByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetScheduleByScheduleTerminals params type */
export type GetScheduleByScheduleTerminalsParams = z.infer<
  typeof getScheduleByScheduleTerminalsParamsSchema
>;

/** Endpoint definition for getScheduleByScheduleTerminals */
export const getScheduleByScheduleTerminalsDef = defineEndpoint({
  moduleGroup: "wsf-schedule",
  functionName: "getScheduleByScheduleTerminals",
  endpoint:
    "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: getScheduleByScheduleTerminalsParamsSchema,
  outputSchema: scheduleResponsesArraySchema,
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});
