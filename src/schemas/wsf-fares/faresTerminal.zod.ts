import { z } from "zod";

/**
 * Schema for validating a single terminal object from the GET /terminals endpoint.
 *
 * This operation retrieves valid departing terminals for a given trip date.
 * A valid trip date may be determined using /validdaterange. Please format the
 * trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring
 * on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must
 * also be passed as part of the URL string.
 */
export const faresTerminalSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for a terminal."),
  /** The name of the terminal. */
  Description: z.string().nullable().describe("The name of the terminal."),
});

export type FaresTerminal = z.infer<typeof faresTerminalSchema>;
