// WSDOT Toll Rates API functions
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
// API Help: https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help

import { zodFetch } from "@/shared/fetching";

import {
  type GetTollRatesParams,
  type GetTollTripInfoParams,
  type GetTollTripRatesParams,
  getTollRatesParamsSchema,
  getTollTripInfoParamsSchema,
  getTollTripRatesParamsSchema,
} from "./inputs";
import {
  tollRateArraySchema,
  tollTripInfoArraySchema,
  tollTripRatesSchema,
} from "./outputs";

// Base URL path for WSDOT Toll Rates API
const WSDOT_TOLL_RATES_BASE = "/Traffic/api/TollRates/TollRatesREST.svc";

/**
 * Retrieves all current toll rates from WSDOT API
 *
 * Returns current toll rates for all WSDOT toll facilities, including
 * pricing information and facility details.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all toll rate data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tollRates = await getTollRates({});
 * console.log(tollRates[0].CurrentToll); // 125
 * ```
 */
export const getTollRates = async (params: GetTollRatesParams = {}) => {
  return zodFetch(
    `${WSDOT_TOLL_RATES_BASE}/GetTollRatesAsJson`,
    {
      input: getTollRatesParamsSchema,
      output: tollRateArraySchema,
    },
    params
  );
};

/**
 * Retrieves toll trip information with geometry data from WSDOT API
 *
 * Returns detailed trip information including geometry data for toll
 * facilities and routes.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all toll trip information data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const tripInfo = await getTollTripInfo({});
 * console.log(tripInfo[0].TripName); // "405tp01351"
 * ```
 */
export const getTollTripInfo = async (params: GetTollTripInfoParams = {}) => {
  return zodFetch(
    `${WSDOT_TOLL_RATES_BASE}/GetTollTripInfoAsJson`,
    {
      input: getTollTripInfoParamsSchema,
      output: tollTripInfoArraySchema,
    },
    params
  );
};

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
    `${WSDOT_TOLL_RATES_BASE}/GetTollTripRatesAsJson`,
    {
      input: getTollTripRatesParamsSchema,
      output: tollTripRatesSchema,
    },
    params
  );
};
