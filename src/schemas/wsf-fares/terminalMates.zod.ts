import { z } from "zod";
import { terminalMateSchema } from "./terminalMate.zod";

/**
 * Schema for validating the response from the GET /terminalmates endpoint.
 * Returns an array of terminal mate objects.
 */
export const terminalMatesSchema = z
  .array(terminalMateSchema)
  .describe(
    "Array of arriving terminals for a given departing terminal and trip date."
  );

export type TerminalMates = z.infer<typeof terminalMatesSchema>;
