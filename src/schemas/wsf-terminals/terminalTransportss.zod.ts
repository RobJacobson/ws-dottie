import { z } from "zod";
import { terminalTransportsSchema } from "./terminalTransports.zod";

/**
 * Array of terminal transports
 *
 * Helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc).
 */
export const terminalTransportssSchema = z
  .array(terminalTransportsSchema)
  .describe(
    "Helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc)."
  );

export type TerminalTransportss = z.infer<typeof terminalTransportssSchema>;
