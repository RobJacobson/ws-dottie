import {
  fetchFareLineItemsBasic,
  fetchFareLineItemsByTripDateAndTerminals,
  fetchFareLineItemsVerbose,
} from "./fareLineItems.endpoints";

export const useFareLineItemsByTripDateAndTerminals =
  fetchFareLineItemsByTripDateAndTerminals.useQuery;

export const useFareLineItemsBasic = fetchFareLineItemsBasic.useQuery;

export const useFareLineItemsVerbose = fetchFareLineItemsVerbose.useQuery;
