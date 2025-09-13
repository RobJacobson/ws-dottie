import { z } from "zod";
import { terminalMatesForTerminalSchema } from "./terminalMatesForTerminal.zod";

/**
 * TerminalMatesForTerminals schema
 *
 * Array of terminal mates for a specific terminal.
 */
export const terminalMatesForTerminalsSchema = z
  .array(terminalMatesForTerminalSchema)
  .describe(
    "The arriving terminals for the given departing terminal and trip date."
  );

/** TerminalMatesForTerminals type */
export type TerminalMatesForTerminals = z.infer<
  typeof terminalMatesForTerminalsSchema
>;
