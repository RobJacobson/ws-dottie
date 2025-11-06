/**
 * @fileoverview Input schemas for WSF Fares API TerminalCombo endpoints
 *
 * These schemas define the input parameters for WSF Fares API TerminalCombo endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for TerminalCombo endpoint
 *
 * This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalComboInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare collection description, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fare collection information by trip date."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to identify origin terminal for fare collection."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalMates to retrieve valid arriving terminals for departing terminal. Used to identify destination terminal for fare collection."
      ),
  })
  .describe(
    "Retrieves fare collection description for specific terminal combination and trip date, returning departing/arriving terminal names and collection details. Use GetTerminals, GetTerminalMates, and GetValidDateRange to determine valid parameters. Use for understanding fare collection procedures for specific routes."
  );

export type TerminalComboInput = z.infer<typeof terminalComboInputSchema>;

/**
 * Input schema for TerminalComboVerbose endpoint
 *
 * This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalComboVerboseInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare collection descriptions, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fare collection information by trip date."
      ),
  })
  .describe(
    "Retrieves fare collection descriptions for all terminal combinations available on specified trip date, returning all departing/arriving terminal pairs with collection details. Use GetValidDateRange to determine valid trip dates. Use for comprehensive fare collection information lookup."
  );

export type TerminalComboVerboseInput = z.infer<
  typeof terminalComboVerboseInputSchema
>;
