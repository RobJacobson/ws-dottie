// WSF Fares API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { zodFetch } from "@/shared/fetching";

import {
  type GetFareLineItemsBasicParams,
  type GetFareLineItemsParams,
  type GetFareLineItemsVerboseParams,
  type GetFaresCacheFlushDateParams,
  type GetFaresTerminalMatesParams,
  type GetFaresTerminalsParams,
  type GetFaresValidDateRangeParams,
  type GetFareTotalsParams,
  type GetTerminalComboParams,
  type GetTerminalComboVerboseParams,
  getFareLineItemsBasicParamsSchema,
  getFareLineItemsParamsSchema,
  getFareLineItemsVerboseParamsSchema,
  getFaresCacheFlushDateParamsSchema,
  getFaresTerminalMatesParamsSchema,
  getFaresTerminalsParamsSchema,
  getFaresValidDateRangeParamsSchema,
  getFareTotalsParamsSchema,
  getTerminalComboParamsSchema,
  getTerminalComboVerboseParamsSchema,
} from "./inputs";
import {
  fareLineItemsArraySchema,
  fareLineItemsBasicArraySchema,
  fareLineItemsVerboseResponseSchema,
  faresCacheFlushDateSchema,
  faresTerminalsArraySchema,
  faresValidDateRangeSchema,
  fareTotalsArraySchema,
  terminalComboSchema,
  terminalComboVerboseArraySchema,
  terminalMatesArraySchema,
} from "./outputs";

// Base URL path for WSF Fares API
const WSF_FARES_BASE = "/ferries/api/fares/rest";

/**
 * Get cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to cache flush date
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const flushDate = await getFaresCacheFlushDate({});
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getFaresCacheFlushDate = async (
  params: GetFaresCacheFlushDateParams = {}
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/cacheflushdate`,
    {
      input: getFaresCacheFlushDateParamsSchema,
      output: faresCacheFlushDateSchema,
    },
    params
  );
};

/**
 * Get valid date range for fares data from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to valid date range information
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const dateRange = await getFaresValidDateRange({});
 * console.log(dateRange.DateFrom); // "2024-01-01T00:00:00Z"
 * ```
 */
export const getFaresValidDateRange = async (
  params: GetFaresValidDateRangeParams = {}
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/validdaterange`,
    {
      input: getFaresValidDateRangeParamsSchema,
      output: faresValidDateRangeSchema,
    },
    params
  );
};

/**
 * Get valid departing terminals for a trip date from WSF Fares API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to array of valid departing terminals
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminals = await getFaresTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals[0].Description); // "Anacortes"
 * ```
 */
export const getFaresTerminals = async (params: GetFaresTerminalsParams) => {
  return zodFetch(
    `${WSF_FARES_BASE}/terminals/{tripDate}`,
    {
      input: getFaresTerminalsParamsSchema,
      output: faresTerminalsArraySchema,
    },
    params
  );
};

/**
 * Get arriving terminals for a departing terminal and trip date from WSF Fares API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and terminalID parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalID - The unique identifier for the departing terminal
 * @returns Promise resolving to array of arriving terminals
 * @throws {Error} When the API request fails or validation fails
 */
export const getFaresTerminalMates = async (
  params: GetFaresTerminalMatesParams
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/terminalmates/{tripDate}/{terminalID}`,
    {
      input: getFaresTerminalMatesParamsSchema,
      output: terminalMatesArraySchema,
    },
    params
  );
};

/**
 * Get fare collection description for a terminal combination from WSF Fares API
 *
 * Retrieves fare collection description for a specific terminal combination on a given trip date.
 * This endpoint provides information about how fares are collected for the specified route.
 *
 * @param params - Object containing tripDate, departingTerminalID, and arrivingTerminalID parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @returns Promise resolving to terminal combination information
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminalCombo = await getTerminalCombo({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2
 * });
 * console.log(terminalCombo.CollectionDescription); // "One-way"
 * ```
 */
export const getTerminalCombo = async (params: GetTerminalComboParams) => {
  return zodFetch(
    `${WSF_FARES_BASE}/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}`,
    {
      input: getTerminalComboParamsSchema,
      output: terminalComboSchema,
    },
    params
  );
};

/**
 * Get all terminal combinations for a trip date from WSF Fares API
 *
 * Retrieves all valid terminal combinations for a given trip date. This endpoint provides
 * comprehensive information about all available routes and their fare collection methods.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to array of all terminal combinations
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const terminalCombos = await getTerminalComboVerbose({ tripDate: new Date('2024-01-15') });
 * console.log(terminalCombos.length); // 15
 * ```
 */
export const getTerminalComboVerbose = async (
  params: GetTerminalComboVerboseParams
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/terminalcomboverbose/{tripDate}`,
    {
      input: getTerminalComboVerboseParamsSchema,
      output: terminalComboVerboseArraySchema,
    },
    params
  );
};

/**
 * Get most popular fares for a route from WSF Fares API
 *
 * Retrieves the most popular fare line items for a specific route. This endpoint provides
 * the commonly used fare options for the specified terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @returns Promise resolving to array of most popular fare line items
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareLineItems = await getFareLineItemsBasic({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2,
 *   roundTrip: false
 * });
 * console.log(fareLineItems.length); // 8
 * ```
 */
export const getFareLineItemsBasic = async (
  params: GetFareLineItemsBasicParams
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}`,
    {
      input: getFareLineItemsBasicParamsSchema,
      output: fareLineItemsBasicArraySchema,
    },
    params
  );
};

/**
 * Get all fares for a route from WSF Fares API
 *
 * Retrieves all available fare line items for a specific route. This endpoint provides
 * comprehensive fare information including all fare types and options for the specified
 * terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @returns Promise resolving to array of all fare line items
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareLineItems = await getFareLineItems({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2,
 *   roundTrip: false
 * });
 * console.log(fareLineItems.length); // 12
 * ```
 */
export const getFareLineItems = async (params: GetFareLineItemsParams) => {
  return zodFetch(
    `${WSF_FARES_BASE}/farelineitems/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}`,
    {
      input: getFareLineItemsParamsSchema,
      output: fareLineItemsArraySchema,
    },
    params
  );
};

/**
 * Get all fares for all terminal combinations on a trip date from WSF Fares API
 *
 * Retrieves all fare line items for all terminal combinations on a given trip date.
 * This endpoint provides comprehensive fare information for all available routes
 * in a single call.
 *
 * @param params - Object containing tripDate parameter
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to complex object with all fare line items for all routes
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareLineItemsVerbose = await getFareLineItemsVerbose({ tripDate: new Date('2024-01-15') });
 * console.log(fareLineItemsVerbose.TerminalComboVerbose.length); // 15
 * ```
 */
export const getFareLineItemsVerbose = async (
  params: GetFareLineItemsVerboseParams
) => {
  return zodFetch(
    `${WSF_FARES_BASE}/farelineitemsverbose/{tripDate}`,
    {
      input: getFareLineItemsVerboseParamsSchema,
      output: fareLineItemsVerboseResponseSchema,
    },
    params
  );
};

/**
 * Calculate fare totals for a set of fare line items from WSF Fares API
 *
 * Calculates the total fare cost for a specific combination of fare line items and quantities.
 * This endpoint provides fare calculation functionality for booking and reservation systems.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, and quantities parameters
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in the calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @returns Promise resolving to fare total calculation
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const fareTotals = await getFareTotals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalID: 1,
 *   arrivingTerminalID: 2,
 *   roundTrip: false,
 *   fareLineItemIDs: [1, 2],
 *   quantities: [2, 1]
 * });
 * console.log(fareTotals.length); // 2
 * ```
 */
export const getFareTotals = async (params: GetFareTotalsParams) => {
  return zodFetch(
    `${WSF_FARES_BASE}/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}`,
    {
      input: getFareTotalsParamsSchema,
      output: fareTotalsArraySchema,
    },
    params
  );
};
