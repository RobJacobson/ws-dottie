import { z } from "zod";
import { terminalTimeSchema } from "./terminalTime.zod";

/**
 * Array of terminal times.
 */
export const terminalTimesSchema = z
  .array(terminalTimeSchema)
  .describe(
    "One or more terminal departures or arrivals made by the same vessel."
  );

export type TerminalTimes = z.infer<typeof terminalTimesSchema>;
