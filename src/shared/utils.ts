import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

// ============================================================================
// TYPES
// ============================================================================

/**
 * Options for WS‑Dottie hooks that map to TanStack Query's UseQueryOptions,
 * excluding 'queryKey' and 'queryFn' which are provided by the hooks.
 *
 * This allows consumers to customize query behavior while maintaining
 * the required queryKey and queryFn structure.
 */
export type TanStackOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
>;

// ============================================================================
// LOGGING
// ============================================================================

/**
 * Logging modes for individual API calls
 * - "none": No logging output
 * - "info": Basic information logging
 * - "debug": Detailed debugging information
 */
export type LoggingMode = "none" | "info" | "debug";

// Determine if we're in development mode for conditional logging
const isDevelopment =
  typeof process !== "undefined" && process.env.NODE_ENV === "development";

/**
 * Centralized logging utility for WS-Dottie
 * Provides consistent logging interface with environment-aware debug logging
 */
const log = {
  debug: isDevelopment
    ? console.debug.bind(console, "[WS-Dottie Debug]")
    : () => {}, // No-op in production
  info: console.info.bind(console, "[WS-Dottie Info]"),
  warn: console.warn.bind(console, "[WS-Dottie Warn]"),
  error: console.error.bind(console, "[WS-Dottie Error]"),
};

export default log;

// ============================================================================
// REACT QUERY HOOKS
// ============================================================================

// Polling interval for cache invalidation checks (5 minutes)
const POLLING_INTERVAL = 5 * 60 * 1000;

/**
 * Hook that combines useQuery with automatic cache invalidation
 *
 * This hook automatically monitors a last update time endpoint and invalidates
 * the cache when the underlying data has been updated on the server.
 *
 * @param queryKey - The React Query key for this endpoint
 * @param queryFn - The function that fetches the data
 * @param fetchLastUpdateTime - Function that fetches the last update time
 * @param options - Optional React Query options (merged with defaults)
 * @param params - Optional parameters to pass to the query function
 * @returns React Query result with automatic cache invalidation
 *
 * @example
 * ```typescript
 * export const useVesselAccommodations = (userOptions?: TanStackOptions<VesselAccommodation[]>) => {
 *   return useQueryWithAutoUpdate({
 *     queryKey: ["wsf", "vessels", "accommodations"],
 *     queryFn: getVesselAccommodations,
 *     fetchLastUpdateTime: getCacheFlushDateVessels,
 *     options: { ...tanstackQueryOptions.DAILY_UPDATES, ...userOptions }
 *   });
 * };
 *
 * // Usage with custom options
 * const { data } = useVesselAccommodations({
 *   staleTime: 30000,
 *   refetchOnWindowFocus: false
 * });
 * ```
 */
export const useQueryWithAutoUpdate = <TData, TParams = void>({
  queryKey,
  queryFn,
  fetchLastUpdateTime,
  options = {},
  params,
}: {
  queryKey: readonly unknown[];
  queryFn: (params: TParams) => Promise<TData>;
  fetchLastUpdateTime: () => Promise<Date | null>;
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">;
  params?: TParams;
}) => {
  const queryClient = useQueryClient();

  // Track the last update time to detect changes
  const previousLastUpdateTime = useRef<Date | null>(null);

  // Reference to the polling interval for cleanup
  const intervalRef = useRef<NodeJS.Timeout>();

  // Main query using React Query
  const queryResult = useQuery({
    queryKey,
    queryFn: () => queryFn(params || ({} as TParams)),
    ...options,
  });

  // Auto-update logic using useEffect
  useEffect(() => {
    /**
     * Polls the last update time endpoint to detect data changes
     * and invalidates the cache when updates are detected
     */
    const pollLastUpdateTime = async () => {
      try {
        const currentLastUpdateTime = await fetchLastUpdateTime();

        // Early return if no previous time to compare against
        if (!previousLastUpdateTime.current || !currentLastUpdateTime) {
          previousLastUpdateTime.current = currentLastUpdateTime;
          return;
        }

        // Early return if times are the same (no change detected)
        if (
          previousLastUpdateTime.current.getTime() ===
          currentLastUpdateTime.getTime()
        ) {
          return;
        }

        // Last update time changed - invalidate all queries for this endpoint
        queryClient.invalidateQueries({ queryKey });

        // Update our reference to the new last update time
        previousLastUpdateTime.current = currentLastUpdateTime;
      } catch (error) {
        // Silently fail - cache invalidation is not critical for functionality
        console.warn("Failed to check last update time:", error);
      }
    };

    // Perform initial check immediately
    pollLastUpdateTime();

    // Set up periodic polling at the specified interval
    intervalRef.current = setInterval(pollLastUpdateTime, POLLING_INTERVAL);

    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchLastUpdateTime, queryClient, queryKey]);

  return queryResult;
};
