import { z } from "zod";

/**
 * Schema for terminal mates by route response from WSF Schedule API.
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using /routes. Similarly, a valid trip date may be determined using /validdaterange.
 * Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring on April 1, 2014).
 * A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.
 */
export const terminalMatesByRouteSchema = z.object({
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

export type TerminalMatesByRoute = z.infer<typeof terminalMatesByRouteSchema>;

/**
 * TerminalMatesByRoutes schema
 *
 * Array of terminal mates by route.
 */
export const terminalMatesByRoutesSchema = z
  .array(terminalMatesByRouteSchema)
  .describe(
    "The valid departing and arriving terminal combinations for the given trip date and route."
  );

/** TerminalMatesByRoutes type */
export type TerminalMatesByRoutes = z.infer<typeof terminalMatesByRoutesSchema>;
