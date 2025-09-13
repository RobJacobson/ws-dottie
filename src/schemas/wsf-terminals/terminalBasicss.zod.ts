import { z } from "zod";
import { terminalBasicsSchema } from "./terminalBasics.zod";

/**
 * Array of terminal basics
 *
 * The most basic / brief information pertaining to terminals.
 */
export const terminalBasicssSchema = z
  .array(terminalBasicsSchema)
  .describe("The most basic / brief information pertaining to terminals.");

export type TerminalBasicss = z.infer<typeof terminalBasicssSchema>;
