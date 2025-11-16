import {
  fetchScheduledRoutes,
  fetchScheduledRoutesById,
} from "./scheduledRoutes.endpoints";

export const useScheduledRoutes = fetchScheduledRoutes.useQuery;

export const useScheduledRoutesById = fetchScheduledRoutesById.useQuery;
