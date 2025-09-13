import { z } from "zod";
import { faresTerminalSchema } from "./faresTerminal.zod";

/**
 * Schema for validating the response from the GET /terminals endpoint.
 * Returns an array of terminal objects.
 */
export const faresTerminalsSchema = z
  .array(faresTerminalSchema)
  .describe("Array of valid departing terminals for a given trip date.");

export type FaresTerminals = z.infer<typeof faresTerminalsSchema>;
