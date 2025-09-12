import { z } from "zod";
import { scheduleResponseSingleSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getScheduleByTerminals */
const getScheduleByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** GetScheduleByTerminals params type */

/** Endpoint definition for getScheduleByTerminals */
export const getScheduleByTerminalsDef = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/schedule/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: getScheduleByTerminalsParamsSchema,
  outputSchema: scheduleResponseSingleSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
});
