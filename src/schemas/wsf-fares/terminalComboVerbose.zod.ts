import { z } from "zod";

import { terminalComboVerboseItemSchema } from "./terminalComboVerboseItem.zod";

/**
 * Schema for validating the response from the GET /terminalcomboverbose endpoint.
 * Returns an array of terminal combo verbose objects.
 */
export const terminalComboVerboseSchema = z
  .array(terminalComboVerboseItemSchema)
  .describe(
    "Array of fare collection descriptions for all terminal combinations available on a given trip date."
  );

export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;
