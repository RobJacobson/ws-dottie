// Schedule Schedules hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";
import type { ScheduleDeparture as Sailing, Schedule } from "../types";
import {
  getAllSailings,
  getSailings,
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
} from "./api";

/**
 * Hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route and date.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param tripDate - The trip date for the schedule
 * @param routeId - The route ID to get schedule for
 * @returns React Query result containing Schedule data
 */
export const useScheduleByRoute = (tripDate: Date, routeId: number) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byRoute",
      tripDate.toISOString().split("T")[0],
      routeId,
    ],
    queryFn: () => getScheduleByRoute({ tripDate, routeID: routeId }),
    enabled: !!tripDate && !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching schedule by terminals from WSF Schedule API
 *
 * Retrieves schedule information for a specific terminal pair and date.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing trip date and terminal IDs
 * @returns React Query result containing Schedule data
 */
export const useScheduleByTerminals = (params: {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () => getScheduleByTerminals(params),
    enabled:
      !!params.tripDate &&
      !!params.departingTerminalID &&
      !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route.
 * This data is updated infrequently and provides static schedule
 * information used in route-specific scheduling contexts.
 *
 * @param routeId - The route ID to get today's schedule for
 * @returns React Query result containing Schedule data
 */
export const useScheduleTodayByRoute = (routeId: number) => {
  return useQuery({
    queryKey: ["schedule", "schedules", "todayByRoute", routeId],
    queryFn: () => getScheduleTodayByRoute({ routeID: routeId }),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching today's schedule by terminals from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific terminal pair.
 * This data is updated infrequently and provides static schedule
 * information used in terminal-specific scheduling contexts.
 *
 * @param params - Object containing terminal IDs
 * @returns React Query result containing Schedule data
 */
export const useScheduleTodayByTerminals = (params: {
  departingTerminalID: number;
  arrivingTerminalID: number;
}) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "todayByTerminals",
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    enabled: !!params.departingTerminalID && !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching sailings from WSF Schedule API
 *
 * Retrieves sailing information for a specific scheduled route.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
export const useSailings = (schedRouteID: number) => {
  return useQuery({
    queryKey: ["schedule", "sailings", schedRouteID],
    queryFn: () => getSailings({ schedRouteID }),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailing information for a specific scheduled route and year.
 * This data is updated infrequently and provides static sailing
 * information used in scheduled route contexts.
 *
 * @param schedRouteID - The scheduled route ID to get sailings for
 * @param year - The year to get sailings for
 * @returns React Query result containing an array of Sailing objects
 */
export const useAllSailings = (schedRouteID: number, year: number) => {
  return useQuery({
    queryKey: ["schedule", "allSailings", schedRouteID, year],
    queryFn: () => getAllSailings({ schedRouteID, year }),
    enabled: !!schedRouteID && !!year,
    ...createInfrequentUpdateOptions(),
  });
};
