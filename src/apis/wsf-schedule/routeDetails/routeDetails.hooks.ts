import {
  fetchRouteDetailsByTripDate,
  fetchRouteDetailsByTripDateAndRouteId,
  fetchRouteDetailsByTripDateAndTerminals,
} from "./routeDetails.endpoints";

export const useRouteDetailsByTripDate = fetchRouteDetailsByTripDate.useQuery;

export const useRouteDetailsByTripDateAndRouteId =
  fetchRouteDetailsByTripDateAndRouteId.useQuery;

export const useRouteDetailsByTripDateAndTerminals =
  fetchRouteDetailsByTripDateAndTerminals.useQuery;
