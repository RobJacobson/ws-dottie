import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getScheduleTerminals */
const scheduleTerminalsInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getScheduleTerminals */
export const getScheduleTerminalsMeta = defineEndpoint({
  api: "wsf-schedule",
  function: "getScheduleTerminals",
  endpoint: "/ferries/api/schedule/rest/terminals/{tripDate}",
  inputSchema: scheduleTerminalsInput,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});

// Type exports
export type ScheduleTerminalsInput = z.infer<typeof scheduleTerminalsInput>;
