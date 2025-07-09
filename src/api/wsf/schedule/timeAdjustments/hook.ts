// Schedule Time Adjustments hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { TimeAdjustment } from "../types";
import {
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
} from "./api";

/**
 * Hook for fetching all time adjustments from WSF Schedule API
 *
 * Retrieves time adjustment information for schedule operations.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduling contexts.
 *
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustments = () => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments"],
    queryFn: getTimeAdjustments,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching time adjustments by route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific route.
 * This data is updated infrequently and provides static time
 * adjustment information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustmentsByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "byRoute", routeId],
    queryFn: () => getTimeAdjustmentsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustment information for a specific scheduled route.
 * This data is updated infrequently and provides static time
 * adjustment information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get time adjustments for
 * @returns React Query result containing an array of TimeAdjustment objects
 */
export const useTimeAdjustmentsBySchedRoute = (schedRouteID: number) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "bySchedRoute", schedRouteID],
    queryFn: () => getTimeAdjustmentsBySchedRoute(schedRouteID),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions(),
  });
};
