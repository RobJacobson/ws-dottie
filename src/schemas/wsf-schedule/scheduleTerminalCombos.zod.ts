import { z } from "zod";
import { scheduleTerminalComboSchema } from "./scheduleTerminalCombo.zod";

/**
 * Array of terminal combos.
 */
export const scheduleTerminalCombosSchema = z
  .array(scheduleTerminalComboSchema)
  .describe("A grouping of departure and arrival terminal pairs.");

export type ScheduleTerminalCombos = z.infer<typeof scheduleTerminalCombosSchema>;
