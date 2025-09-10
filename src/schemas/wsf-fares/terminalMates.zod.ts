import { z } from "zod";

/**
 * Schema for validating a single terminal mate object from the GET /terminalmates endpoint.
 *
 * This operation provides arriving terminals for a given departing terminal and trip date.
 * A valid departing terminal may be found by using /terminals. Similarly, a valid trip
 * date may be determined using /validdaterange. Please format the trip date input as
 * 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014). A valid
 * API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.
 */
export const terminalMateSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().nullable().describe("The name of the terminal."),
});

/**
 * Schema for validating the response from the GET /terminalmates endpoint.
 * Returns an array of terminal mate objects.
 */
export const terminalMatesSchema = z
  .array(terminalMateSchema)
  .describe(
    "Array of arriving terminals for a given departing terminal and trip date."
  );

export type TerminalMate = z.infer<typeof terminalMateSchema>;
export type TerminalMates = z.infer<typeof terminalMatesSchema>;
