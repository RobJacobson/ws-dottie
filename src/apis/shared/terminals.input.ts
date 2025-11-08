import { z } from "@/shared/zod-openapi-init";

/**
 * Common terminals input schema shared across WSF APIs.
 *
 * Validates the trip date parameter used when requesting terminal listings.
 */
export const terminalsInputSchema = z
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

export type TerminalsInput = z.infer<typeof terminalsInputSchema>;

/**
 * Common terminal mates input schema shared across WSF APIs.
 *
 * Validates the trip date and terminal identifier parameters required when
 * fetching terminal mates.
 */
export const terminalMatesInputSchema = z
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

export type TerminalMatesInput = z.infer<typeof terminalMatesInputSchema>;
