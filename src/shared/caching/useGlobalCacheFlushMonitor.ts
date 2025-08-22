import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// Import all WSF cache flush hooks
import { useFaresCacheFlushDate } from "@/api/wsf-fares/getFaresCacheFlushDate";
import { useCacheFlushDateSchedule } from "@/api/wsf-schedule/getCacheFlushDateSchedule";
import { useCacheFlushDateTerminals } from "@/api/wsf-terminals/getCacheFlushDateTerminals";
import { useCacheFlushDateVessels } from "@/api/wsf-vessels/getCacheFlushDateVessels";

// Cache flush endpoint configuration
const CACHE_FLUSH_ENDPOINTS = [
  { key: "fares", hook: useFaresCacheFlushDate, queryKey: ["fares"] },
  { key: "schedule", hook: useCacheFlushDateSchedule, queryKey: ["schedule"] },
  {
    key: "terminals",
    hook: useCacheFlushDateTerminals,
    queryKey: ["terminals"],
  },
  { key: "vessels", hook: useCacheFlushDateVessels, queryKey: ["vessels"] },
] as const;

// Polling interval: 5 minutes
const POLLING_INTERVAL = 5 * 60 * 1000;

/**
 * Global Cache Flush Monitor Hook
 *
 * This hook monitors all WSF cache flush endpoints and automatically
 * invalidates relevant queries when the cache flush date changes.
 *
 * Features:
 * - Consolidates all cache flush monitoring into a single hook
 * - Polls every 5 minutes for efficiency
 * - Automatically invalidates queries when changes are detected
 * - No user configuration required
 *
 * @returns Object containing cache flush dates and monitoring status
 */
export const useGlobalCacheFlushMonitor = () => {
  const queryClient = useQueryClient();
  const previousFlushDates = useRef<Record<string, Date | null>>({});

  // Use React Query's useQueries for efficient batching
  const results = useQueries({
    queries: CACHE_FLUSH_ENDPOINTS.map(({ key, hook }) => ({
      queryKey: ["cacheFlush", key],
      queryFn: () => hook(),
      refetchInterval: POLLING_INTERVAL,
      staleTime: POLLING_INTERVAL,
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex: number) =>
        Math.min(1000 * 2 ** attemptIndex, 10000),
    })),
  });

  // Extract cache flush dates from results
  const cacheFlushDates = results.reduce(
    (acc, result, index) => {
      const { key } = CACHE_FLUSH_ENDPOINTS[index];
      const dateData = result.data?.data;
      acc[key] = dateData instanceof Date ? dateData : null;
      return acc;
    },
    {} as Record<string, Date | null>
  );

  // Monitor for changes and invalidate queries
  useEffect(() => {
    Object.entries(cacheFlushDates).forEach(([key, currentDate]) => {
      const previousDate = previousFlushDates.current[key];
      const endpoint = CACHE_FLUSH_ENDPOINTS.find((ep) => ep.key === key);

      if (
        endpoint &&
        previousDate &&
        currentDate &&
        previousDate.getTime() !== currentDate.getTime()
      ) {
        // Cache flush date changed - invalidate all queries for this endpoint
        queryClient.invalidateQueries({ queryKey: endpoint.queryKey });

        // Also invalidate any queries that might be related
        queryClient.invalidateQueries({
          queryKey: endpoint.queryKey,
          exact: false,
        });
      }

      // Update previous date
      previousFlushDates.current[key] = currentDate || null;
    });
  }, [cacheFlushDates, queryClient]);

  // Calculate monitoring status
  const isMonitoring = results.every((result) => !result.isError);
  const hasErrors = results.some((result) => result.isError);
  const isLoading = results.some((result) => result.isLoading);

  return {
    cacheFlushDates,
    isMonitoring,
    hasErrors,
    isLoading,
    lastUpdated: new Date(),
  };
};
