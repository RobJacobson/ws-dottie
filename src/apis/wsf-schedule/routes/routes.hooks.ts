import {
  fetchRoutesByTripDate,
  fetchRoutesByTripDateAndTerminals,
} from "./routes.endpoints";

export const useRoutesByTripDate = fetchRoutesByTripDate.useQuery;

export const useRoutesByTripDateAndTerminals =
  fetchRoutesByTripDateAndTerminals.useQuery;
