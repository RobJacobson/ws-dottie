// WSF Fares API React Query hooks
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import {
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsBasicWithParams,
  getFareLineItemsVerbose,
  getFareLineItemsWithParams,
  getFaresCacheFlushDate,
  getFaresTerminalMates,
  getFaresTerminals,
  getFaresValidDateRange,
  getFareTotals,
  getTerminalCombo,
  getTerminalComboVerbose,
  getTerminalComboWithParams,
  getTerminalMatesWithParams,
} from "./api";
import type {
  FareLineItemsParams,
  FareTotalRequest,
  TerminalComboParams,
  TerminalMatesParams,
} from "./types";

/**
 * Hook for getting cache flush date from WSF Fares API
 */
export const useFaresCacheFlushDate = () => {
  return useQuery({
    queryKey: ["fares", "cacheFlushDate"],
    queryFn: getFaresCacheFlushDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting valid date range from WSF Fares API
 */
export const useFaresValidDateRange = () => {
  return useQuery({
    queryKey: ["fares", "validDateRange"],
    queryFn: getFaresValidDateRange,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminals for a trip date from WSF Fares API
 */
export const useFaresTerminals = (tripDate: Date | null | undefined) => {
  return useQuery({
    queryKey: ["fares", "terminals", tripDate?.toISOString().split("T")[0]],
    queryFn: () => getFaresTerminals(tripDate!),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminal mates from WSF Fares API
 */
export const useFaresTerminalMates = (
  tripDate: Date | null | undefined,
  terminalID: number | null | undefined
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalMates",
      tripDate?.toISOString().split("T")[0],
      terminalID,
    ],
    queryFn: () => getFaresTerminalMates(tripDate!, terminalID!),
    enabled: !!tripDate && !!terminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminal mates using parameter object
 */
export const useFaresTerminalMatesWithParams = (
  params: TerminalMatesParams
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalMates",
      params.tripDate?.toISOString().split("T")[0],
      params.terminalID,
    ],
    queryFn: () => getTerminalMatesWithParams(params),
    enabled: !!params.tripDate && !!params.terminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminal combo from WSF Fares API
 */
export const useTerminalCombo = (
  tripDate: Date | null | undefined,
  departingTerminalID: number | null | undefined,
  arrivingTerminalID: number | null | undefined
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalCombo",
      tripDate?.toISOString().split("T")[0],
      departingTerminalID,
      arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo(tripDate!, departingTerminalID!, arrivingTerminalID!),
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminal combo using parameter object
 */
export const useTerminalComboWithParams = (params: TerminalComboParams) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalCombo",
      params.tripDate?.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () => getTerminalComboWithParams(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalID &&
      !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting terminal combo verbose from WSF Fares API
 */
export const useTerminalComboVerbose = (tripDate: Date | null | undefined) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalComboVerbose",
      tripDate?.toISOString().split("T")[0],
    ],
    queryFn: () => getTerminalComboVerbose(tripDate!),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare line items basic from WSF Fares API
 */
export const useFareLineItemsBasic = (
  tripDate: Date | null | undefined,
  departingTerminalID: number | null | undefined,
  arrivingTerminalID: number | null | undefined,
  roundTrip: boolean
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsBasic",
      tripDate?.toISOString().split("T")[0],
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItemsBasic(
        tripDate!,
        departingTerminalID!,
        arrivingTerminalID!,
        roundTrip
      ),
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare line items from WSF Fares API
 */
export const useFareLineItems = (
  tripDate: Date | null | undefined,
  departingTerminalID: number | null | undefined,
  arrivingTerminalID: number | null | undefined,
  roundTrip: boolean
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItems",
      tripDate?.toISOString().split("T")[0],
      departingTerminalID,
      arrivingTerminalID,
      roundTrip,
    ],
    queryFn: () =>
      getFareLineItems(
        tripDate!,
        departingTerminalID!,
        arrivingTerminalID!,
        roundTrip
      ),
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare line items using parameter object
 */
export const useFareLineItemsWithParams = (params: FareLineItemsParams) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItems",
      params.tripDate?.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItemsWithParams(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalID &&
      !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare line items basic using parameter object
 */
export const useFareLineItemsBasicWithParams = (
  params: FareLineItemsParams
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsBasic",
      params.tripDate?.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID,
      params.roundTrip,
    ],
    queryFn: () => getFareLineItemsBasicWithParams(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalID &&
      !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare line items verbose from WSF Fares API
 */
export const useFareLineItemsVerbose = (tripDate: Date | null | undefined) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsVerbose",
      tripDate?.toISOString().split("T")[0],
    ],
    queryFn: () => getFareLineItemsVerbose(tripDate!),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for getting fare totals from WSF Fares API
 */
export const useFareTotals = (request: FareTotalRequest) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareTotals",
      request.tripDate.toISOString().split("T")[0],
      request.departingTerminalID,
      request.arrivingTerminalID,
      request.roundTrip,
      request.fareLineItemIDs.join(","),
      request.quantities.join(","),
    ],
    queryFn: () => getFareTotals(request),
    enabled:
      !!request.tripDate &&
      !!request.departingTerminalID &&
      !!request.arrivingTerminalID &&
      request.fareLineItemIDs.length > 0 &&
      request.quantities.length > 0 &&
      request.fareLineItemIDs.length === request.quantities.length,
    ...createInfrequentUpdateOptions(),
  });
};
