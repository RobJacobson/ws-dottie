import { z } from "zod";
import { terminalVerboseSchema } from "./terminalVerbose.zod";

/**
 * Array of terminal verbose
 *
 * Highly detailed information pertaining to terminals.
 */
export const terminalVerbosesSchema = z
  .array(terminalVerboseSchema)
  .describe("Highly detailed information pertaining to terminals.");

export type TerminalVerboses = z.infer<typeof terminalVerbosesSchema>;
