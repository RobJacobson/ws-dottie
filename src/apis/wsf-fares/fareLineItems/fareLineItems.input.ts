/**
 * @fileoverview Input schemas for WSF Fares API FareLineItems endpoints
 *
 * These schemas define the input parameters for WSF Fares API FareLineItems endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod";

/**
 * Input schema for FareLineItemsBasic endpoint
 *
 * This operation retrieves the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsBasicInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare line items, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fares by trip date."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to identify origin terminal for fare calculation."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalMates to retrieve valid arriving terminals. Used to identify destination terminal for fare calculation."
      ),
    RoundTrip: z
      .boolean()
      .describe(
        "Trip type indicator, as a boolean. E.g., true for round trip fares, false for one-way fares. Determines whether returned fares are for round trip or one-way journeys."
      ),
  })
  .describe(
    "Retrieves most popular fare line items for specified terminal combination and trip date, returning simplified fare list with common passenger and vehicle fares. Use GetTerminals, GetTerminalMates, and GetValidDateRange to determine valid parameters. Use for quick fare lookups of common fare types."
  );

export type FareLineItemsBasicInput = z.infer<
  typeof fareLineItemsBasicInputSchema
>;

/**
 * Input schema for FareLineItems endpoint
 *
 * This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsByTripDateAndTerminalsInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare line items, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fares by trip date."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to identify origin terminal for fare calculation."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalMates to retrieve valid arriving terminals. Used to identify destination terminal for fare calculation."
      ),
    RoundTrip: z
      .boolean()
      .describe(
        "Trip type indicator, as a boolean. E.g., true for round trip fares, false for one-way fares. Determines whether returned fares are for round trip or one-way journeys."
      ),
  })
  .describe(
    "Retrieves all fare line items for specified terminal combination and trip date, returning complete fare list with passenger and vehicle fares. Use GetTerminals, GetTerminalMates, and GetValidDateRange to determine valid parameters. Use for comprehensive fare lookups and fare calculation workflows."
  );

export type FareLineItemsByTripDateAndTerminalsInput = z.infer<
  typeof fareLineItemsByTripDateAndTerminalsInputSchema
>;

/**
 * Input schema for FareLineItemsVerbose endpoint
 *
 * This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const fareLineItemsVerboseInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for fare line items, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter fares by trip date."
      ),
  })
  .describe(
    "Retrieves fare line items for all valid terminal combinations on specified trip date, returning comprehensive fare data including terminal combinations, one-way fares, and round trip fares. Use GetValidDateRange to determine valid trip dates. Use for bulk fare lookups across all routes."
  );

export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseInputSchema
>;
