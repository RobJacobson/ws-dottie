import { z } from "zod";

/**
 * Schema for terminal mates for a specific terminal response from WSF Schedule API.
 * This operation provides arriving terminals for a given departing terminal and trip date.
 * A valid departing terminal may be found by using /terminals. Similarly, a valid trip date may be determined using /validdaterange.
 * Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.
 */
export const terminalMatesForTerminalSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().describe("The name of the terminal."),
});

export type TerminalMatesForTerminal = z.infer<
  typeof terminalMatesForTerminalSchema
>;

/**
 * Array of terminal mates for a specific terminal.
 */
export const terminalMatesForTerminalArraySchema = z
  .array(terminalMatesForTerminalSchema)
  .describe(
    "The arriving terminals for the given departing terminal and trip date."
  );

export type TerminalMatesForTerminalArray = z.infer<
  typeof terminalMatesForTerminalArraySchema
>;
