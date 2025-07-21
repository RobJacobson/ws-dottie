// WSF API Cache Invalidation Utilities
// Uses cache flush dates to invalidate queries when data changes

import { useQueryClient } from "@tanstack/react-query";

/**
 * Hook for invalidating WSF queries based on cache flush dates
 *
 * This hook monitors cache flush dates and invalidates related queries
 * when the cache flush date changes, indicating that the underlying data
 * has been updated on the server.
 */
export const useWsfCacheInvalidation = () => {
  const queryClient = useQueryClient();

  /**
   * Generic function to invalidate queries by key
   */
  const invalidateQueries = (queryKey: string[]) => {
    queryClient.invalidateQueries({ queryKey });
  };

  /**
   * Invalidate all vessel-related queries
   */
  const invalidateVesselQueries = () => invalidateQueries(["vessels"]);

  /**
   * Invalidate all terminal-related queries
   */
  const invalidateTerminalQueries = () => invalidateQueries(["terminals"]);

  /**
   * Invalidate all schedule-related queries
   */
  const invalidateScheduleQueries = () => invalidateQueries(["schedule"]);

  /**
   * Invalidate specific vessel queries by type
   */
  const invalidateVesselQueriesByType = (
    type: "locations" | "verbose" | "basics"
  ) => invalidateQueries(["vessels", type]);

  /**
   * Invalidate specific terminal queries by type
   */
  const invalidateTerminalQueriesByType = (
    type: "sailingSpace" | "verbose" | "basics" | "locations" | "waitTimes"
  ) => invalidateQueries(["terminals", type]);

  /**
   * Invalidate specific schedule queries by type
   */
  const invalidateScheduleQueriesByType = (
    type:
      | "routes"
      | "schedules"
      | "terminals"
      | "vessels"
      | "timeAdjustments"
      | "alerts"
  ) => invalidateQueries(["schedule", type]);

  /**
   * Invalidate all WSF queries (use sparingly)
   */
  const invalidateAllWsfQueries = () => {
    invalidateVesselQueries();
    invalidateTerminalQueries();
    invalidateScheduleQueries();
  };

  return {
    invalidateVesselQueries,
    invalidateTerminalQueries,
    invalidateScheduleQueries,
    invalidateVesselQueriesByType,
    invalidateTerminalQueriesByType,
    invalidateScheduleQueriesByType,
    invalidateAllWsfQueries,
  };
};

/**
 * Hook for monitoring cache flush dates and automatically invalidating queries
 */
export const useWsfCacheFlushMonitor = () => {
  const queryClient = useQueryClient();

  /**
   * Generic function to monitor cache flush date changes
   */
  const monitorCacheFlush = (
    queryKey: string[],
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => {
    if (
      lastFlushDate &&
      currentFlushDate &&
      lastFlushDate.getTime() !== currentFlushDate.getTime()
    ) {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  /**
   * Monitor vessels cache flush date and invalidate vessel queries when it changes
   */
  const monitorVesselsCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => monitorCacheFlush(["vessels"], lastFlushDate, currentFlushDate);

  /**
   * Monitor terminals cache flush date and invalidate terminal queries when it changes
   */
  const monitorTerminalsCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => monitorCacheFlush(["terminals"], lastFlushDate, currentFlushDate);

  /**
   * Monitor schedule cache flush date and invalidate schedule queries when it changes
   */
  const monitorScheduleCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => monitorCacheFlush(["schedule"], lastFlushDate, currentFlushDate);

  return {
    monitorVesselsCacheFlush,
    monitorTerminalsCacheFlush,
    monitorScheduleCacheFlush,
  };
};
