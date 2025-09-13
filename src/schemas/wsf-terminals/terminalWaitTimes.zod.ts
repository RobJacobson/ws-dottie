import { z } from "zod";
import { terminalSchema } from "./terminal.zod";
import { waitTimeSchema } from "./waitTime.zod";

/**
 * Terminal wait times schema for WSF Terminals API
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on
 * passengers. A TerminalID, or unique terminal identifier, may be optionally passed to
 * retrieve a specific terminal. A valid API Access Code from the WSDOT Traveler API must
 * be passed as part of the URL string.
 */
export const terminalWaitTimesSchema = terminalSchema.extend({
  /** The wait times associated with this terminal. */
  WaitTimes: z
    .array(waitTimeSchema)
    .nullable()
    .describe("The wait times associated with this terminal."),
});

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
