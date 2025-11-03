/**
 * @fileoverview Input schemas for WSF Fares API Terminals endpoints
 *
 * These schemas define the input parameters for WSF Fares API Terminals endpoints.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for Terminals endpoint
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalsSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve valid departing terminals, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025, '2026-03-21' for March 21, 2026. Must be within valid date range from GetValidDateRange. Used to filter terminals by trip date availability."
      ),
  })
  .describe(
    "Retrieves valid departing terminals for specified trip date, returning terminal IDs and names. Use GetValidDateRange to determine valid trip dates. Use for fare calculation workflows to identify available origin terminals."
  );

export type TerminalsInput = z.infer<typeof terminalsSchema>;

/**
 * Input schema for TerminalMates endpoint
 *
 * This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014).
 */
export const terminalMatesSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve arriving terminals, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetValidDateRange. Used to filter terminal mates by trip date availability."
      ),
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to filter arriving terminals by origin terminal."
      ),
  })
  .describe(
    "Retrieves arriving terminals (terminal mates) for specified departing terminal and trip date, returning terminal IDs and names. Use GetTerminals to find valid departing terminals and GetValidDateRange for valid trip dates. Use for fare calculation workflows to identify available destination terminals."
  );

export type TerminalMatesInput = z.infer<typeof terminalMatesSchema>;
