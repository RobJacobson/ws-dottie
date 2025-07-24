// WSF Fares API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { createFetchFactory } from "@/shared/fetching/apiUtils";

import type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItemsVerboseResponse,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  TerminalCombo,
  TerminalComboVerbose,
  TerminalMate,
} from "./types";

// Create a factory function for WSF Fares API
const createWsfFaresFetch = createFetchFactory(
  "https://www.wsdot.wa.gov/ferries/api/fares/rest"
);

/**
 * Get cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to cache flush date
 */
export const getFaresCacheFlushDate = createWsfFaresFetch<Date | null>(
  "/cacheflushdate"
);

/**
 * Get valid date range for fares data from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to valid date range information
 */
export const getFaresValidDateRange =
  createWsfFaresFetch<FaresValidDateRange>("/validdaterange");

/**
 * Get valid departing terminals for a trip date from WSF Fares API
 *
 * @param params - Object containing tripDate
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of valid departing terminals
 */
export const getFaresTerminals = createWsfFaresFetch<
  { tripDate: Date },
  FaresTerminal[]
>("/terminals/{tripDate}");

/**
 * Get arriving terminals for a departing terminal and trip date from WSF Fares API
 *
 * @param params - Object containing tripDate and terminalID
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of arriving terminals
 */
export const getFaresTerminalMates = createWsfFaresFetch<
  { tripDate: Date; terminalID: number },
  TerminalMate[]
>("/terminalmates/{tripDate}/{terminalID}");

/**
 * Get fare collection description for a terminal combination from WSF Fares API
 *
 * @param params - Object containing tripDate, departingTerminalID, and arrivingTerminalID
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to terminal combination information
 */
export const getTerminalCombo = createWsfFaresFetch<
  { tripDate: Date; departingTerminalID: number; arrivingTerminalID: number },
  TerminalCombo
>("/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}");

/**
 * Get all terminal combinations for a trip date from WSF Fares API
 *
 * @param params - Object containing tripDate
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of all terminal combinations
 */
export const getTerminalComboVerbose = createWsfFaresFetch<
  { tripDate: Date },
  TerminalComboVerbose[]
>("/terminalcomboverbose/{tripDate}");

/**
 * Get most popular fares for a route from WSF Fares API
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of most popular fare line items
 */
export const getFareLineItemsBasic = createWsfFaresFetch<
  {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  },
  FareLineItemBasic[]
>(
  "/farelineitemsbasic/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}"
);

/**
 * Get all fares for a route from WSF Fares API
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, and roundTrip
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to array of all fare line items
 */
export const getFareLineItems = createWsfFaresFetch<
  {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  },
  FareLineItem[]
>(
  "/farelineitems/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}"
);

/**
 * Get all fares for all terminal combinations on a trip date from WSF Fares API
 *
 * @param params - Object containing tripDate
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to complex object with all fare line items for all routes
 */
export const getFareLineItemsVerbose = createWsfFaresFetch<
  { tripDate: Date },
  FareLineItemsVerboseResponse
>("/farelineitemsverbose/{tripDate}");

/**
 * Calculate fare totals for a set of fare line items from WSF Fares API
 *
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, and quantities
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to fare total calculation
 */
export const getFareTotals = createWsfFaresFetch<
  {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
    fareLineItemIDs: number[];
    quantities: number[];
  },
  FareTotal[]
>(
  "/faretotals/{tripDate}/{departingTerminalID}/{arrivingTerminalID}/{roundTrip}/{fareLineItemIDs}/{quantities}"
);
