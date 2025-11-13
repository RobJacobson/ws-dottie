import {
  fetchTravelTimeById,
  fetchTravelTimes,
} from "./travelTimeRoutes.endpoints";

export const useTravelTimeById = fetchTravelTimeById.useQuery;

export const useTravelTimes = fetchTravelTimes.useQuery;
