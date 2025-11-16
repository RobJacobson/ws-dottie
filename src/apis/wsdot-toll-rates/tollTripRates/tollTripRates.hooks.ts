import {
  fetchTollTripRates,
  fetchTripRatesByDate,
  fetchTripRatesByVersion,
} from "./tollTripRates.endpoints";

export const useTollTripRates = fetchTollTripRates.useQuery;

export const useTripRatesByDate = fetchTripRatesByDate.useQuery;

export const useTripRatesByVersion = fetchTripRatesByVersion.useQuery;
