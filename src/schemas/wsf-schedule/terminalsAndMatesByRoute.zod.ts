import { z } from "zod";

/**
 * Schema for WSF Schedule API terminals and mates by route response.
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`.
 * Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const terminalsAndMatesByRouteSchema = z.object({
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

export type TerminalsAndMatesByRoute = z.infer<
  typeof terminalsAndMatesByRouteSchema
>;
