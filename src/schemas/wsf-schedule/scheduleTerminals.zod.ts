import { z } from "zod";
import { scheduleTerminalSchema } from "./scheduleTerminal.zod";

/**
 * Array of schedule terminals.
 */
export const scheduleTerminalsSchema = z
  .array(scheduleTerminalSchema)
  .describe("Valid departing terminals for a given trip date.");

export type ScheduleTerminals = z.infer<typeof scheduleTerminalsSchema>;
