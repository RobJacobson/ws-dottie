// WSF Fares API functions
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { parseWsfDate } from "@/shared/fetching/dateUtils";
import { fetchWsf, fetchWsfArray } from "@/shared/fetching/fetch";

import type {
  FareLineItem,
  FareLineItemBasic,
  FareLineItemsParams,
  FareLineItemsVerboseResponse,
  FareLineItemVerbose,
  FaresCacheFlushDate,
  FaresTerminal,
  FaresValidDateRange,
  FareTotal,
  FareTotalRequest,
  TerminalCombo,
  TerminalComboParams,
  TerminalComboVerbose,
  TerminalMate,
  TerminalMatesParams,
  TerminalParams,
} from "./types";

/**
 * Get cache flush date from WSF Fares API
 *
 * Some of the retrieval operations return data that changes infrequently.
 * Use this operation to poll for changes. When the date returned is modified,
 * drop your application cache and retrieve fresh data.
 *
 * @returns Promise resolving to cache flush date
 */
export const getFaresCacheFlushDate =
  async (): Promise<FaresCacheFlushDate> => {
    const response = await fetchWsf<string>("fares", "/cacheflushdate");
    return parseWsfDate(response);
  };

/**
 * Get valid date range for fares data from WSF Fares API
 *
 * Retrieves a date range for which fares data is currently published & available.
 *
 * @returns Promise resolving to valid date range information
 */
export const getFaresValidDateRange =
  async (): Promise<FaresValidDateRange> => {
    const response = await fetchWsf<{ DateFrom: string; DateThru: string }>(
      "fares",
      "/validdaterange"
    );
    return {
      DateFrom: parseWsfDate(response.DateFrom),
      DateThru: parseWsfDate(response.DateThru),
    };
  };

/**
 * Get valid departing terminals for a trip date from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @returns Promise resolving to array of valid departing terminals
 */
export const getFaresTerminals = (tripDate: Date): Promise<FaresTerminal[]> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsfArray<FaresTerminal>("fares", `/terminals/${formattedDate}`);
};

/**
 * Get arriving terminals for a departing terminal and trip date from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @param terminalID - The departing terminal ID
 * @returns Promise resolving to array of arriving terminals
 */
export const getFaresTerminalMates = (
  tripDate: Date,
  terminalID: number
): Promise<TerminalMate[]> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsfArray<TerminalMate>(
    "fares",
    `/terminalmates/${formattedDate}/${terminalID}`
  );
};

/**
 * Get fare collection description for a terminal combination from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @param departingTerminalID - The departing terminal ID
 * @param arrivingTerminalID - The arriving terminal ID
 * @returns Promise resolving to terminal combination information
 */
export const getTerminalCombo = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number
): Promise<TerminalCombo> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsf<TerminalCombo>(
    "fares",
    `/terminalcombo/${formattedDate}/${departingTerminalID}/${arrivingTerminalID}`
  );
};

/**
 * Get all terminal combinations for a trip date from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @returns Promise resolving to array of all terminal combinations
 */
export const getTerminalComboVerbose = (
  tripDate: Date
): Promise<TerminalComboVerbose[]> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsfArray<TerminalComboVerbose>(
    "fares",
    `/terminalcomboverbose/${formattedDate}`
  );
};

/**
 * Get most popular fares for a route from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @param departingTerminalID - The departing terminal ID
 * @param arrivingTerminalID - The arriving terminal ID
 * @param roundTrip - Whether this is a round trip (true) or one-way (false)
 * @returns Promise resolving to array of most popular fare line items
 */
export const getFareLineItemsBasic = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean
): Promise<FareLineItemBasic[]> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsfArray<FareLineItemBasic>(
    "fares",
    `/farelineitemsbasic/${formattedDate}/${departingTerminalID}/${arrivingTerminalID}/${roundTrip}`
  );
};

/**
 * Get all fares for a route from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @param departingTerminalID - The departing terminal ID
 * @param arrivingTerminalID - The arriving terminal ID
 * @param roundTrip - Whether this is a round trip (true) or one-way (false)
 * @returns Promise resolving to array of all fare line items
 */
export const getFareLineItems = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean
): Promise<FareLineItem[]> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsfArray<FareLineItem>(
    "fares",
    `/farelineitems/${formattedDate}/${departingTerminalID}/${arrivingTerminalID}/${roundTrip}`
  );
};

/**
 * Get all fares for all terminal combinations on a trip date from WSF Fares API
 *
 * @param tripDate - The trip date in YYYY-MM-DD format
 * @returns Promise resolving to complex object with all fare line items for all routes
 */
export const getFareLineItemsVerbose = (
  tripDate: Date
): Promise<FareLineItemsVerboseResponse> => {
  const formattedDate = tripDate.toISOString().split("T")[0];
  return fetchWsf<FareLineItemsVerboseResponse>(
    "fares",
    `/farelineitemsverbose/${formattedDate}`
  );
};

/**
 * Calculate fare totals for a set of fare line items from WSF Fares API
 *
 * @param request - The fare total calculation request parameters
 * @returns Promise resolving to fare total calculation
 */
export const getFareTotals = (
  request: FareTotalRequest
): Promise<FareTotal[]> => {
  const formattedDate = request.tripDate.toISOString().split("T")[0];
  const fareLineItemIDs = request.fareLineItemIDs.join(",");
  const quantities = request.quantities.join(",");

  return fetchWsfArray<FareTotal>(
    "fares",
    `/faretotals/${formattedDate}/${request.departingTerminalID}/${request.arrivingTerminalID}/${request.roundTrip}/${fareLineItemIDs}/${quantities}`
  );
};

// Convenience functions with parameter objects

/**
 * Get fare line items using parameter object
 *
 * @param params - Fare line items parameters
 * @returns Promise resolving to array of fare line items
 */
export const getFareLineItemsWithParams = (
  params: FareLineItemsParams
): Promise<FareLineItem[]> =>
  getFareLineItems(
    params.tripDate,
    params.departingTerminalID,
    params.arrivingTerminalID,
    params.roundTrip
  );

/**
 * Get fare line items basic using parameter object
 *
 * @param params - Fare line items parameters
 * @returns Promise resolving to array of basic fare line items
 */
export const getFareLineItemsBasicWithParams = (
  params: FareLineItemsParams
): Promise<FareLineItemBasic[]> =>
  getFareLineItemsBasic(
    params.tripDate,
    params.departingTerminalID,
    params.arrivingTerminalID,
    params.roundTrip
  );

/**
 * Get terminal mates using parameter object
 *
 * @param params - Terminal mates parameters
 * @returns Promise resolving to array of terminal mates
 */
export const getTerminalMatesWithParams = (
  params: TerminalMatesParams
): Promise<TerminalMate[]> =>
  getFaresTerminalMates(params.tripDate, params.terminalID);

/**
 * Get terminal combo using parameter object
 *
 * @param params - Terminal combo parameters
 * @returns Promise resolving to terminal combination
 */
export const getTerminalComboWithParams = (
  params: TerminalComboParams
): Promise<TerminalCombo> =>
  getTerminalCombo(
    params.tripDate,
    params.departingTerminalID,
    params.arrivingTerminalID
  );
