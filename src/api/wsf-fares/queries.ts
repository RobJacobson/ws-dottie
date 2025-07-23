// WSF Fares API React Query hooks
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { type UseQueryOptions, useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { jsDateToYyyyMmDd } from "@/shared/fetching/dateUtils";

import {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsVerbose,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
  getTerminalCombo,
  getTerminalComboVerbose,
} from "./api";

/**
 * Hook for getting cache flush date from WSF Fares API
 */
export const useFaresCacheFlushDate = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresCacheFlushDate>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["fares", "cacheFlushDate"],
    queryFn: getFaresCacheFlushDate,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting valid date range from WSF Fares API
 */
export const useFaresValidDateRange = (
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresValidDateRange>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["fares", "validDateRange"],
    queryFn: getFaresValidDateRange,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminals for a trip date from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 */
export const useFaresTerminals = (
  tripDate: Date,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresTerminals>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["fares", "terminals", jsDateToYyyyMmDd(tripDate)],
    queryFn: () => getFaresTerminals(tripDate),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal mates from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param terminalID - Required departing terminal ID
 */
export const useFaresTerminalMates = (
  tripDate: Date,
  terminalID: number,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresTerminalMates>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalMates",
      jsDateToYyyyMmDd(tripDate),
      terminalID,
    ],
    queryFn: () => getFaresTerminalMates(tripDate, terminalID),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal combo from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 */
export const useTerminalCombo = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalCombo>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalCombo",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo(tripDate, departingTerminalID, arrivingTerminalID),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal combo verbose from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 */
export const useTerminalComboVerbose = (
  tripDate: Date,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalComboVerbose>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["fares", "terminalComboVerbose", jsDateToYyyyMmDd(tripDate)],
    queryFn: () => getTerminalComboVerbose(tripDate),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare line items basic from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Required round trip flag
 */
export const useFareLineItemsBasic = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItemsBasic>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsBasic",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItemsBasic(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      ),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare line items from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Required round trip flag
 */
export const useFareLineItems = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItems>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItems",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItems(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip
      ),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare line items verbose from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 */
export const useFareLineItemsVerbose = (
  tripDate: Date,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareLineItemsVerbose>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["fares", "fareLineItemsVerbose", jsDateToYyyyMmDd(tripDate)],
    queryFn: () => getFareLineItemsVerbose(tripDate),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare totals from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Required round trip flag
 * @param fareLineItemIDs - Required array of fare line item IDs
 * @param quantities - Required array of quantities corresponding to each fare line item ID
 */
export const useFareTotals = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean,
  fareLineItemIDs: number[],
  quantities: number[],
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFareTotals>>>,
    "queryKey" | "queryFn" | "enabled"
  >
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareTotals",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
      fareLineItemIDs.join(","),
      quantities.join(","),
    ],
    queryFn: () =>
      getFareTotals(
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip,
        fareLineItemIDs,
        quantities
      ),
    enabled:
      fareLineItemIDs.length > 0 &&
      quantities.length > 0 &&
      fareLineItemIDs.length === quantities.length,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
