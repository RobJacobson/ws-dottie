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
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 */
export const useFaresTerminals = (
  params: { tripDate: Date },
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getFaresTerminals>>>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: ["wsf", "fares", "terminals", jsDateToYyyyMmDd(params.tripDate)],
    queryFn: () => getFaresTerminals({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal mates from WSF Fares API
 * @param params - Object containing tripDate and terminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.terminalID - Required departing terminal ID
 */
export const useFaresTerminalMates = (
  params: { tripDate: Date; terminalID: number },
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
      jsDateToYyyyMmDd(params.tripDate),
      params.terminalID,
    ],
    queryFn: () =>
      getFaresTerminalMates({
        tripDate: params.tripDate,
        terminalID: params.terminalID,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal combo from WSF Fares API
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - Required departing terminal ID
 * @param params.arrivingTerminalID - Required arriving terminal ID
 */
export const useTerminalCombo = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
  },
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
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting terminal combo verbose from WSF Fares API
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 */
export const useTerminalComboVerbose = (
  params: { tripDate: Date },
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
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getTerminalComboVerbose({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting basic fare line items from WSF Fares API
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - Required departing terminal ID
 * @param params.arrivingTerminalID - Required arriving terminal ID
 * @param params.roundTrip - Whether this is a round trip
 */
export const useFareLineItemsBasic = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  },
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
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () =>
      getFareLineItemsBasic({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
        roundTrip: params.roundTrip,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare line items from WSF Fares API
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - Required departing terminal ID
 * @param params.arrivingTerminalID - Required arriving terminal ID
 * @param params.roundTrip - Whether this is a round trip
 */
export const useFareLineItems = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
  },
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
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () =>
      getFareLineItems({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
        roundTrip: params.roundTrip,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting verbose fare line items from WSF Fares API
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 */
export const useFareLineItemsVerbose = (
  params: { tripDate: Date },
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
      jsDateToYyyyMmDd(params.tripDate),
    ],
    queryFn: () => getFareLineItemsVerbose({ tripDate: params.tripDate }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};

/**
 * Hook for getting fare totals from WSF Fares API
 * @param params - Object containing tripDate, departingTerminalID, arrivingTerminalID, roundTrip, fareLineItemIDs, quantities
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalID - Required departing terminal ID
 * @param params.arrivingTerminalID - Required arriving terminal ID
 * @param params.roundTrip - Whether this is a round trip
 * @param params.fareLineItemIDs - Array of fare line item IDs
 * @param params.quantities - Array of quantities corresponding to fare line item IDs
 */
export const useFareTotals = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
    roundTrip: boolean;
    fareLineItemIDs: number[];
    quantities: number[];
  },
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
      jsDateToYyyyMmDd(params.tripDate),
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
      params.fareLineItemIDs,
      params.quantities,
    ],
    queryFn: () =>
      getFareTotals({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
        roundTrip: params.roundTrip,
        fareLineItemIDs: params.fareLineItemIDs,
        quantities: params.quantities,
      }),
    ...tanstackQueryOptions.WEEKLY_UPDATES,
    ...options,
  });
};
