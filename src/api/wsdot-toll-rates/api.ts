// WSDOT Toll Rates API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type { TollRate, TollTripInfo, TollTripRates } from "./types";

// Create a factory function for WSDOT Toll Rates API
const createWsdotTollRatesFetch = createFetchFactory(
  "https://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc"
);

/**
 * Retrieves all current toll rates from WSDOT API
 *
 * Returns current toll rates for all WSDOT toll facilities, including
 * pricing information and facility details.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all toll rate data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tollRates = await getTollRates();
 * console.log(tollRates[0].CurrentToll); // 125
 * ```
 */
export const getTollRates = createWsdotTollRatesFetch<TollRate[]>(
  "/GetTollRatesAsJson"
);

/**
 * Retrieves toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing all toll trip information data
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tripInfo = await getTollTripInfo();
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const getTollTripInfo = createWsdotTollRatesFetch<TollTripInfo[]>(
  "/GetTollTripInfoAsJson"
);

/**
 * Retrieves toll trip rates with messages and update times from WSDOT API
 *
 * Returns current toll trip rates along with system messages and
 * last updated timestamps.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise containing toll trip rates with last updated time
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tripRates = await getTollTripRates();
 * console.log(tripRates.LastUpdated); // Date object
 * console.log(tripRates.Trips[0].Toll); // 0
 * ```
 */
export const getTollTripRates = createWsdotTollRatesFetch<TollTripRates>(
  "/GetTollTripRatesAsJson"
);
