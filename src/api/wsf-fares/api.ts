// WSF Fares API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { createFetchFactory } from "@/shared/fetching/api";

import type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItemsVerboseResponse,
  FaresCacheFlushDate,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "./schemas";
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
} from "./schemas";

// Create a factory function for WSF Fares API
const createFetch = createFetchFactory("/ferries/api/fares/rest");

/**
 * Get cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to cache flush date
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const flushDate = await getFaresCacheFlushDate();
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getFaresCacheFlushDate = async () => {
  const fetcher = createFetch("/cacheflushdate");
  const data = await fetcher();
  return faresCacheFlushDateSchema.parse(data) as FaresCacheFlushDate;
};

/**
 * Get valid date range for fares data from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to valid date range information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const dateRange = await getFaresValidDateRange();
 * console.log(dateRange.StartDate); // "2024-01-01T00:00:00Z"
 * ```
 */
export const getFaresValidDateRange = async () => {
  const fetcher = createFetch("/validdaterange");
  const data = await fetcher();
  return faresValidDateRangeSchema.parse(data) as FaresValidDateRange;
};

/**
 * Get valid departing terminals for a trip date from WSF Fares API
 *
 * Retrieves valid departing terminals for a given trip date. A valid trip date
 * may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of valid departing terminals
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getFaresTerminals({ tripDate: new Date('2024-01-15') });
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getFaresTerminals = async (params: { tripDate: Date }) => {
  const fetcher = createFetch<{ tripDate: Date }>("/terminals/{tripDate}");
  const data = await fetcher(params);
  return faresTerminalsArraySchema.parse(data) as FaresTerminal[];
};

/**
 * Get arriving terminals for a departing terminal and trip date from WSF Fares API
 *
 * Provides arriving terminals for a given departing terminal and trip date. A valid departing
 * terminal may be found by using terminals. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and terminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalID - The unique identifier for the departing terminal
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of arriving terminals
 * @throws {WsfApiError} When the API request fails
 */
export const getFaresTerminalMates = async (params: {
  tripDate: Date;
  terminalID: number;
}) => {
  const fetcher = createFetch<{ tripDate: Date; terminalID: number }>(
    "/terminalmates/{tripDate}/{terminalID}"
  );
  const data = await fetcher(params);
  return terminalMatesArraySchema.parse(data) as TerminalMate[];
};

/**
 * Get fare collection description for a terminal combination from WSF Fares API
 *
 * Retrieves fare collection description for a specific terminal combination on a given trip date.
 * This endpoint provides information about how fares are collected for the specified route.
 *
 * @param params - Object containing tripDate, departingTerminalID, and arrivingTerminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to terminal combination information
 * @throws {WsfApiError} When the API request fails
 */
export const getTerminalCombo = async (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
}) => {
  const fetcher = createFetch<{
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
  }>("/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}");
  const data = await fetcher(params);
  return terminalComboSchema.parse(data) as TerminalCombo;
};

/**
 * Get all terminal combinations for a trip date from WSF Fares API
 *
 * Retrieves all valid terminal combinations for a given trip date. This endpoint provides
 * comprehensive information about all available routes and their fare collection methods.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of all terminal combinations
 * @throws {WsfApiError} When the API request fails
 */
export const getTerminalComboVerbose = async (params: { tripDate: Date }) => {
  const fetcher = createFetch<{ tripDate: Date }>(
    "/terminalcomboverbose/{tripDate}"
  );
  const data = await fetcher(params);
  return terminalComboVerboseArraySchema.parse(data) as TerminalComboVerbose[];
};

/**
 * Get most popular fares for a route from WSF Fares API
 *
 * Retrieves the most popular fare line items for a specific route. This endpoint provides
 * the commonly used fare options for the specified terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of most popular fare line items
 * @throws {WsfApiError} When the API request fails
 */
export const getFareLineItemsBasic = async (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
  roundTrip: boolean;
}) => {
  const fetcher = createFetch<{
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  }>(
    "/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}"
  );
  const data = await fetcher(params);
  return fareLineItemsBasicArraySchema.parse(data) as FareLineItemBasic[];
};

/**
 * Get all fares for a route from WSF Fares API
 *
 * Retrieves all available fare line items for a specific route. This endpoint provides
 * comprehensive fare information including all fare types and options for the specified
 * terminal combination and trip type.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of all fare line items
 * @throws {WsfApiError} When the API request fails
 */
export const getFareLineItems = async (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
  roundTrip: boolean;
}) => {
  const fetcher = createFetch<{
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  }>(
    "/farelineitems/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}"
  );
  const data = await fetcher(params);
  return fareLineItemsArraySchema.parse(data) as FareLineItem[];
};

/**
 * Get all fares for all terminal combinations on a trip date from WSF Fares API
 *
 * Retrieves all fare line items for all terminal combinations on a given trip date.
 * This endpoint provides comprehensive fare information for all available routes
 * in a single call.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to complex object with all fare line items for all routes
 * @throws {WsfApiError} When the API request fails
 */
export const getFareLineItemsVerbose = async (params: { tripDate: Date }) => {
  const fetcher = createFetch<{ tripDate: Date }>(
    "/farelineitemsverbose/{tripDate}"
  );
  const data = await fetcher(params);
  return fareLineItemsVerboseResponseSchema.parse(
    data
  ) as FareLineItemsVerboseResponse;
};

/**
 * Calculate fare totals for a set of fare line items from WSF Fares API
 *
 * Calculates the total fare cost for a specific combination of fare line items and quantities.
 * This endpoint provides fare calculation functionality for booking and reservation systems.
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, and quantities
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - The unique identifier for the departing terminal
 * @param params.arrivingTerminalID - The unique identifier for the arriving terminal
 * @param params.roundTrip - Whether this is a round trip
 * @param params.fareLineItemIDs - Array of fare line item IDs to include in the calculation
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to fare total calculation
 * @throws {WsfApiError} When the API request fails
 */
export const getFareTotals = async (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
  roundTrip: boolean;
  fareLineItemIDs: number[];
  quantities: number[];
}) => {
  const fetcher = createFetch<{
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
    fareLineItemIDs: number[];
    quantities: number[];
  }>(
    "/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}"
  );
  const data = await fetcher(params);
  return fareTotalsArraySchema.parse(data) as FareTotal[];
};
