import { z } from "zod";

/**
 * Schema for WSF Schedule API terminals and mates response.
 * This operation retrieves all valid departing and arriving terminal combinations for a given trip date.
 * A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.
 */
const terminalsAndMatesItemSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingDescription: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingDescription: z
    .string()
    .describe("The name of the arriving terminal."),
});

/**
 * Array of terminal mate combinations
 */
export const terminalsAndMatesSchema = z
  .array(terminalsAndMatesItemSchema)
  .describe("Array of terminals and mates combinations");

export type TerminalsAndMates = z.infer<typeof terminalsAndMatesSchema>;
