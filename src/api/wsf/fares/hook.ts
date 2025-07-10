// WSF Fares API React Query hooks
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html

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
  TerminalMatesParams,
} from "./types";

// Cache flush date hook
export const useFaresCacheFlushDate = () => {
  return useQuery({
    queryKey: ["fares", "cacheFlushDate"],
    queryFn: getFaresCacheFlushDate,
    ...createInfrequentUpdateOptions(),
  });
};

// Valid date range hook
export const useFaresValidDateRange = () => {
  return useQuery({
    queryKey: ["fares", "validDateRange"],
    queryFn: getFaresValidDateRange,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminals hook
export const useFaresTerminals = (tripDate: Date) => {
  return useQuery({
    queryKey: ["fares", "terminals", tripDate.toISOString().split("T")[0]],
    queryFn: () => getFaresTerminals(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminal mates hook
export const useFaresTerminalMates = (tripDate: Date, terminalID: number) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalMates",
      tripDate.toISOString().split("T")[0],
      terminalID,
    ],
    queryFn: () => getFaresTerminalMates(tripDate, terminalID),
    enabled: !!tripDate && !!terminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminal mates hook with params
export const useFaresTerminalMatesWithParams = (
  params: TerminalMatesParams
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalMates",
      params.tripDate.toISOString().split("T")[0],
      params.terminalID,
    ],
    queryFn: () => getTerminalMatesWithParams(params),
    enabled: !!params.tripDate && !!params.terminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminal combo hook
export const useTerminalCombo = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalCombo",
      tripDate.toISOString().split("T")[0],
      departingTerminalID,
      arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo(tripDate, departingTerminalID, arrivingTerminalID),
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminal combo hook with params
export const useTerminalComboWithParams = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number
) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalCombo",
      tripDate.toISOString().split("T")[0],
      departingTerminalID,
      arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalComboWithParams(
        tripDate,
        departingTerminalID,
        arrivingTerminalID
      ),
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Terminal combo verbose hook
export const useTerminalComboVerbose = (tripDate: Date) => {
  return useQuery({
    queryKey: [
      "fares",
      "terminalComboVerbose",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getTerminalComboVerbose(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

// Fare line items basic hook
export const useFareLineItemsBasic = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsBasic",
      tripDate.toISOString().split("T")[0],
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
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Fare line items hook
export const useFareLineItems = (
  tripDate: Date,
  departingTerminalID: number,
  arrivingTerminalID: number,
  roundTrip: boolean
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItems",
      tripDate.toISOString().split("T")[0],
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
    enabled: !!tripDate && !!departingTerminalID && !!arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

// Fare line items hook with params
export const useFareLineItemsWithParams = (params: FareLineItemsParams) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItems",
      params.tripDate.toISOString().split("T")[0],
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

// Fare line items basic hook with params
export const useFareLineItemsBasicWithParams = (
  params: FareLineItemsParams
) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsBasic",
      params.tripDate.toISOString().split("T")[0],
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

// Fare line items verbose hook
export const useFareLineItemsVerbose = (tripDate: Date) => {
  return useQuery({
    queryKey: [
      "fares",
      "fareLineItemsVerbose",
      tripDate.toISOString().split("T")[0],
    ],
    queryFn: () => getFareLineItemsVerbose(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions(),
  });
};

// Fare totals hook
export const useFareTotals = (request: FareTotalRequest) => {
  const fareLineItemIDs = request.fareLineItemIDs.join(",");
  const quantities = request.quantities.join(",");

  return useQuery({
    queryKey: [
      "fares",
      "fareTotals",
      request.tripDate.toISOString().split("T")[0],
      request.departingTerminalID,
      request.arrivingTerminalID,
      request.roundTrip,
      fareLineItemIDs,
      quantities,
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
