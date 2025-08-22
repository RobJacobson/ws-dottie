import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Retrieves toll trip rates with messages and update times from WSDOT API
 *
 * Returns current toll trip rates along with system messages and
 * last updated timestamps.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing toll trip rates with last updated time
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tripRates = await getTollTripRates({});
 * console.log(tripRates.LastUpdated); // Date object
 * console.log(tripRates.Trips[0].Toll); // 0
 * ```
 */
export const getTollTripRates = async (params: GetTollTripRatesParams = {}) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTollTripRatesParamsSchema,
      output: tollTripRatesSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTollTripRatesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll trip rates. The API returns current toll trip rates along with system messages and last updated timestamps."
  );

export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const tollTripRateSchema = z
  .object({
    Message: z
      .string()
      .describe(
        "System message or notification related to the specific toll trip. Examples include 'Normal rates', 'Holiday rates in effect', 'Maintenance mode', or 'Electronic tolling only'. This field provides important context about the current status of the toll route."
      ),

    MessageUpdateTime: zWsdotDate().describe(
      "Timestamp indicating when the system message was last updated for this toll trip. This field shows the currency of the message information and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Toll: z
      .number()
      .describe(
        "Current toll amount in cents for the specific trip. This field shows the active pricing for the toll route. Examples include 125 (for $1.25), 250 (for $2.50), or 0 (for free travel)."
      ),

    TripName: z
      .string()
      .describe(
        "Unique identifier for the toll trip or route. Examples include '405tp01351', '520tp00123', or '167tp00456'. This field serves as a reference for the specific toll route and can be used for tracking and correlation purposes."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Individual toll trip rate information including pricing, system messages, and update timestamps. This schema represents specific trip pricing data from the WSDOT Toll Rates API, providing essential information for real-time toll pricing, system status monitoring, and travel cost planning."
  );

export const tollTripRatesSchema = z
  .object({
    LastUpdated: zWsdotDate().describe(
      "Timestamp indicating when the overall toll trip rates system was last updated in the WSDOT system. This field shows the currency of all pricing data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Trips: z
      .array(tollTripRateSchema)
      .describe(
        "Array of individual toll trip rate information for all active toll routes. This collection provides comprehensive pricing data that enables real-time toll monitoring, cost planning, and transportation management."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete toll trip rates information including system-wide update time and all individual trip pricing data. This schema represents comprehensive pricing information from the WSDOT Toll Rates API, providing essential data for toll system monitoring, pricing transparency, and travel cost management across all toll facilities."
  );

export type TollTripRate = z.infer<typeof tollTripRateSchema>;
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for retrieving toll trip rates with messages and update times from WSDOT API
 *
 * Returns current toll trip rates along with system messages and
 * last updated timestamps.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with toll trip rates and last updated time
 */
export const useTollTripRates = (
  params: GetTollTripRatesParams = {},
  options?: TanStackOptions<TollTripRates>
): UseQueryResult<TollTripRates, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates", params],
    queryFn: () => getTollTripRates(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
