import { z } from "zod";
import { terminalLocationSchema } from "./terminalLocation.zod";

/**
 * Array of terminal locations
 *
 * Detailed location information pertaining to terminals.
 */
export const terminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe("Detailed location information pertaining to terminals.");

export type TerminalLocations = z.infer<typeof terminalLocationsSchema>;
