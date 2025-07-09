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
   * Invalidate all vessel-related queries when vessels cache flush date changes
   */
  const invalidateVesselQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["vessels"] });
  };

  /**
   * Invalidate all terminal-related queries when terminals cache flush date changes
   */
  const invalidateTerminalQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["terminals"] });
  };

  /**
   * Invalidate all schedule-related queries when schedule cache flush date changes
   */
  const invalidateScheduleQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["schedule"] });
  };

  /**
   * Invalidate specific vessel queries by type
   */
  const invalidateVesselQueriesByType = (
    type: "locations" | "verbose" | "basics"
  ) => {
    queryClient.invalidateQueries({ queryKey: ["vessels", type] });
  };

  /**
   * Invalidate specific terminal queries by type
   */
  const invalidateTerminalQueriesByType = (
    type: "sailingSpace" | "verbose" | "basics" | "locations" | "waitTimes"
  ) => {
    queryClient.invalidateQueries({ queryKey: ["terminals", type] });
  };

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
  ) => {
    queryClient.invalidateQueries({ queryKey: ["schedule", type] });
  };

  /**
   * Invalidate all WSF queries (use sparingly)
   */
  const invalidateAllWsfQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["vessels"] });
    queryClient.invalidateQueries({ queryKey: ["terminals"] });
    queryClient.invalidateQueries({ queryKey: ["schedule"] });
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
 *
 * This hook should be used in a high-level component to monitor cache flush dates
 * and automatically invalidate related queries when data changes.
 */
export const useWsfCacheFlushMonitor = () => {
  const queryClient = useQueryClient();

  /**
   * Monitor vessels cache flush date and invalidate vessel queries when it changes
   */
  const monitorVesselsCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => {
    if (
      lastFlushDate &&
      currentFlushDate &&
      lastFlushDate.getTime() !== currentFlushDate.getTime()
    ) {
      queryClient.invalidateQueries({ queryKey: ["vessels"] });
    }
  };

  /**
   * Monitor terminals cache flush date and invalidate terminal queries when it changes
   */
  const monitorTerminalsCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => {
    if (
      lastFlushDate &&
      currentFlushDate &&
      lastFlushDate.getTime() !== currentFlushDate.getTime()
    ) {
      queryClient.invalidateQueries({ queryKey: ["terminals"] });
    }
  };

  /**
   * Monitor schedule cache flush date and invalidate schedule queries when it changes
   */
  const monitorScheduleCacheFlush = (
    lastFlushDate: Date | null,
    currentFlushDate: Date | null
  ) => {
    if (
      lastFlushDate &&
      currentFlushDate &&
      lastFlushDate.getTime() !== currentFlushDate.getTime()
    ) {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    }
  };

  return {
    monitorVesselsCacheFlush,
    monitorTerminalsCacheFlush,
    monitorScheduleCacheFlush,
  };
};
