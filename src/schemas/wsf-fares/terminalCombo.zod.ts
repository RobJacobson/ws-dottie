import { z } from "zod";

/**
 * Schema for validating the response from the GET /terminalcombo endpoint.
 *
 * This operation describes what fares are collected for a given departing terminal,
 * arriving terminal and trip date. A valid departing terminal may be found by using
 * /terminals while a valid arriving terminal may be found by using /terminalmates.
 * Similarly, a valid trip date may be determined using /validdaterange. Please format
 * the trip date input as 'YYYY-MM-DD' (eg. '2014-04-01' for a trip date occurring
 * on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also
 * be passed as part of the URL string.
 */
export const scheduleTerminalComboSchema = z.object({
  /** The name of the departing terminal. */
  DepartingDescription: z
    .string()
    .nullable()
    .describe("The name of the departing terminal."),
  /** The name of the arriving terminal. */
  ArrivingDescription: z
    .string()
    .nullable()
    .describe("The name of the arriving terminal."),
  /** Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc). */
  CollectionDescription: z
    .string()
    .nullable()
    .describe(
      "Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc)."
    ),
});

export type TerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;
