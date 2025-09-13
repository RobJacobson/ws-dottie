import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleTerminals */
const scheduleTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getScheduleTerminals */
export const getScheduleTerminalsMeta = {
  api: "wsf-schedule",
  function: "getScheduleTerminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: scheduleTerminalsInput,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type ScheduleTerminalsInput = z.infer<typeof scheduleTerminalsInput>;
