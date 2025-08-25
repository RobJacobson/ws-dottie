import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripRates
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson";

/**
 * Retrieves toll trip rates with messages and update times from WSDOT Toll Rates API
 *
 * Returns comprehensive current toll trip rates for all Washington State toll facilities
 * including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge,
 * SR 99 Tunnel, SR 509 Expressway, and Tacoma Narrows Bridge. Includes system messages,
 * current pricing in cents, and last updated timestamps for real-time toll management.
 *
 * @returns Promise containing toll trip rates with last updated time and system notifications
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tripRates = await getTollTripRates();
 * console.log(tripRates.LastUpdated); // Date object
 * console.log(tripRates.Trips[0].Toll); // 125 (for $1.25 on SR 99)
 * console.log(tripRates.Message); // Any system message or notification
 * ```
 */
export const getTollTripRates = async (): Promise<TollTripRates> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripRatesParamsSchema,
    output: tollTripRatesSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripRatesParamsSchema
// GetTollTripRatesParams
// ============================================================================

export const getTollTripRatesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll trip rates with system messages and update times. The API returns comprehensive toll rate data for all active Washington State toll facilities, including current pricing, system notifications, and update timestamps essential for real-time toll management and payment processing."
  );

export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripRatesSchema
// TollTripRates
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

    Version: z
      .number()
      .describe(
        "Current API version number for the WSDOT toll trip rates system. This field indicates the version of the API specification and data format currently in use. Higher version numbers indicate more recent API updates."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete toll trip rates information including system-wide update time and all individual trip pricing data. This schema represents comprehensive pricing information from the WSDOT Toll Rates API, providing essential data for toll system monitoring, pricing transparency, and travel cost management across all toll facilities."
  );

export type TollTripRate = z.infer<typeof tollTripRateSchema>;
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripRates
// ============================================================================

/**
 * Hook for retrieving toll trip rates with messages and update times from WSDOT Toll Rates API
 *
 * Returns comprehensive current toll trip rates for all Washington State toll facilities
 * including I-405 Express Toll Lanes, SR 167 High Occupancy Toll (HOT) lanes, SR 520 Bridge,
 * SR 99 Tunnel, SR 509 Expressway, and Tacoma Narrows Bridge. Includes system messages,
 * current pricing in cents, and last updated timestamps for real-time toll management.
 * Data updates frequently to reflect changing toll rates based on time of day and traffic conditions.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with toll trip rates data for payment processing and toll management
 *
 * @example
 * ```typescript
 * const { data: tripRates } = useTollTripRates();
 * const sr520Rate = tripRates?.Trips?.find(trip => trip.TripName === '520tp00422');
 * console.log(sr520Rate?.Toll); // Current toll in cents for SR 520 eastbound
 * ```
 */
export const useTollTripRates = (
  options?: TanStackOptions<TollTripRates>
): UseQueryResult<TollTripRates, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripRates"],
    queryFn: () => getTollTripRates(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
