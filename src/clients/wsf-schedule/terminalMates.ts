import { z } from "zod";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";
import { datesHelper } from "@/shared/utils";

/** Input schema for getTerminalMates */
const terminalMatesInput = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

/** Endpoint metadata for getTerminalMates */
export const getTerminalMatesMeta = {
  api: "wsf-schedule",
  function: "getTerminalMates",
  endpoint: "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}",
  inputSchema: terminalMatesInput,
  outputSchema: z.array(scheduleTerminalSchema),
  sampleParams: { tripDate: datesHelper.tomorrow(), terminalId: 1 },
  cacheStrategy: "DAILY_STATIC",
} as const;

// Type exports
export type TerminalMatesInput = z.infer<typeof terminalMatesInput>;
