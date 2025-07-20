// WSDOT Toll Rates API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import { fetchWsdot } from "@/shared/fetching/fetch";

import type {
  TollRate,
  TollRatesResponse,
  TollTripInfo,
  TollTripInfoResponse,
  TollTripRatesResponse,
} from "./types";

/**
 * Retrieves all current toll rates from WSDOT API
 *
 * @returns Promise resolving to an array of toll rates
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tollRates = await getTollRates();
 * console.log(tollRates[0].CurrentToll); // 125
 * ```
 */
export const getTollRates = async (): Promise<TollRatesResponse> => {
  return await fetchWsdot<TollRatesResponse>(
    "tollRates",
    "/GetTollRatesAsJson"
  );
};

/**
 * Retrieves toll trip information with geometry data from WSDOT API
 *
 * @returns Promise resolving to an array of toll trip information
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tripInfo = await getTollTripInfo();
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const getTollTripInfo = async (): Promise<TollTripInfoResponse> => {
  return await fetchWsdot<TollTripInfoResponse>(
    "tollRates",
    "/GetTollTripInfoAsJson"
  );
};

/**
 * Retrieves toll trip rates with messages and update times from WSDOT API
 *
 * @returns Promise resolving to toll trip rates with last updated time
 * @throws {WsdotApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const tripRates = await getTollTripRates();
 * console.log(tripRates.LastUpdated); // Date object
 * console.log(tripRates.Trips[0].Toll); // 0
 * ```
 */
export const getTollTripRates = async (): Promise<TollTripRatesResponse> => {
  return await fetchWsdot<TollTripRatesResponse>(
    "tollRates",
    "/GetTollTripRatesAsJson"
  );
};
