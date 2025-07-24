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
    queryKey: ["wsf", "fares", "cacheFlushDate"],
    queryFn: () => getFaresCacheFlushDate(),
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
    queryKey: ["wsf", "fares", "validDateRange"],
    queryFn: () => getFaresValidDateRange(),
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
    queryKey: ["wsf", "fares", "terminals", jsDateToYyyyMmDd(tripDate)],
    queryFn: () => getFaresTerminals({ tripDate }),
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
      "wsf",
      "fares",
      "terminalMates",
      jsDateToYyyyMmDd(tripDate),
      terminalID,
    ],
    queryFn: () => getFaresTerminalMates({ tripDate, terminalID }),
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
      "wsf",
      "fares",
      "terminalCombo",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo({ tripDate, departingTerminalID, arrivingTerminalID }),
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
    queryKey: [
      "wsf",
      "fares",
      "terminalComboVerbose",
      jsDateToYyyyMmDd(tripDate),
    ],
    queryFn: () => getTerminalComboVerbose({ tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting basic fare line items from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Whether this is a round trip
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
      "wsf",
      "fares",
      "fareLineItemsBasic",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItemsBasic({
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare line items from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Whether this is a round trip
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
      "wsf",
      "fares",
      "fareLineItems",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItems({
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting verbose fare line items from WSF Fares API
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
    queryKey: [
      "wsf",
      "fares",
      "fareLineItemsVerbose",
      jsDateToYyyyMmDd(tripDate),
    ],
    queryFn: () => getFareLineItemsVerbose({ tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare totals from WSF Fares API
 * @param tripDate - Required trip date (YYYY-MM-DD format)
 * @param departingTerminalID - Required departing terminal ID
 * @param arrivingTerminalID - Required arriving terminal ID
 * @param roundTrip - Whether this is a round trip
 * @param fareLineItemIDs - Array of fare line item IDs
 * @param quantities - Array of quantities corresponding to fare line item IDs
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
      "wsf",
      "fares",
      "fareTotals",
      jsDateToYyyyMmDd(tripDate),
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
      fareLineItemIDs,
      quantities,
    ],
    queryFn: () =>
      getFareTotals({
        tripDate,
        departingTerminalID,
        arrivingTerminalID,
        roundTrip,
        fareLineItemIDs,
        quantities,
      }),
    enabled:
      !!tripDate &&
      !!departingTerminalID &&
      !!arrivingTerminalID &&
      !!fareLineItemIDs &&
      !!quantities &&
      fareLineItemIDs.length === quantities.length,
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
