import { z } from "zod";

/**
 * Schema for validating a single terminal combo verbose object from the GET /terminalcomboverbose endpoint.
 *
 * This operation retrieves fare collection descriptions for all terminal combinations
 * available on a given trip date. A valid trip date may be determined using /validdaterange.
 * Please format the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date
 * occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must
 * also be passed as part of the URL string.
 */
export const terminalComboVerboseItemSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingDescription: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .int()
    .positive()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingDescritpion: z
    .string()
    .describe("The name of the arriving terminal."),
  /** Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc). */
  CollectionDescription: z
    .string()
    .describe(
      "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
    ),
});

/**
 * Schema for validating the response from the GET /terminalcomboverbose endpoint.
 * Returns an array of terminal combo verbose objects.
 */
export const terminalComboVerboseSchema = z
  .array(terminalComboVerboseItemSchema)
  .describe(
    "Array of fare collection descriptions for all terminal combinations available on a given trip date."
  );

export type TerminalComboVerboseItem = z.infer<
  typeof terminalComboVerboseItemSchema
>;
export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;
