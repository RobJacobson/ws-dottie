import { z } from "zod";
import { terminalWaitTimesSchema } from "./terminalWaitTimes.zod";

/**
 * Array of terminal wait times
 *
 * Tips and wait time conditions for both vehicles and walk-on passengers.
 */
export const terminalWaitTimessSchema = z
  .array(terminalWaitTimesSchema)
  .describe(
    "Tips and wait time conditions for both vehicles and walk-on passengers."
  );

export type TerminalWaitTimess = z.infer<typeof terminalWaitTimessSchema>;
