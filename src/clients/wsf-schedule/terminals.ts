import { z } from "zod";
import { scheduleTerminalsSchema, type ScheduleTerminal } from "@/schemas/wsf-schedule/scheduleTerminal.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleTerminals */
const scheduleTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getScheduleTerminals */
export const getScheduleTerminalsMeta: Endpoint<
  ScheduleTerminalsInput,
  ScheduleTerminal[]
> = {
  api: "wsf-schedule",
  function: "getScheduleTerminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: scheduleTerminalsInput,
  outputSchema: scheduleTerminalsSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type ScheduleTerminalsInput = z.infer<typeof scheduleTerminalsInput>;
