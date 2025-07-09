// Schedule Vessels hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { Vessel } from "../../vessels/types";
import { getVessels, getVesselsByRoute } from "./api";

/**
 * Hook for fetching all vessels from WSF Schedule API
 *
 * Retrieves vessel information for schedule-related operations.
 * This data is updated infrequently and provides static vessel
 * information used in scheduling contexts.
 *
 * @returns React Query result containing an array of Vessel objects
 */
export const useVessels = () => {
  return useQuery({
    queryKey: ["schedule", "vessels"],
    queryFn: getVessels,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching vessels by route from WSF Schedule API
 *
 * Retrieves vessel information for a specific route.
 * This data is updated infrequently and provides static vessel
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get vessels for
 * @returns React Query result containing an array of Vessel objects
 */
export const useVesselsByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "vessels", "byRoute", routeId],
    queryFn: () => getVesselsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};
