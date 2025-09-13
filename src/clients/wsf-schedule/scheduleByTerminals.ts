import { z } from "zod";
import { scheduleResponseSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleByTerminals */
const scheduleByTerminalsInput = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

/** Endpoint metadata for getScheduleByTerminals */
export const getScheduleByTerminalsMeta = {
  api: "wsf-schedule",
  function: "getScheduleByTerminals",
  endpoint:
    "/ferries/api/schedule/rest/schedule/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}",
  inputSchema: scheduleByTerminalsInput,
  outputSchema: scheduleResponseSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingScheduleTerminalId: 1,
    arrivingScheduleTerminalId: 10,
  },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ScheduleByTerminalsInput = z.infer<typeof scheduleByTerminalsInput>;
