/**
 * @fileoverview Cache Flush Date Hooks for WS-Dottie
 *
 * Provides React Query hooks for polling cache flush dates and invalidating
 * queries when flush dates change. This is specifically for WSF APIs that
 * use cache flush dates to indicate when static data has been updated.
 *
 * Uses simple fetch functions that directly call fetchDottie with minimal
 * endpoint descriptors, avoiding circular dependencies.
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import type { CacheFlushDateOutput } from "@/apis/shared/cacheFlushDate";
import {
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import { wsfFaresApiMeta } from "@/apis/wsf-fares/apiMeta";
import { wsfScheduleApiMeta } from "@/apis/wsf-schedule/apiMeta";
import { wsfTerminalsApiMeta } from "@/apis/wsf-terminals/apiMeta";
import { wsfVesselsApiMeta } from "@/apis/wsf-vessels/apiMeta";
import { fetchDottie } from "@/shared/fetching";
import type { FetchEndpoint } from "@/apis/types";

type CacheFlushApiName =
  | "wsf-fares"
  | "wsf-schedule"
  | "wsf-terminals"
  | "wsf-vessels";

const CACHE_FLUSH_API_NAMES = new Set<CacheFlushApiName>([
  "wsf-fares",
  "wsf-schedule",
  "wsf-terminals",
  "wsf-vessels",
]);

// Map API names to their base URLs
const CACHE_FLUSH_BASE_URLS: Record<CacheFlushApiName, string> = {
  "wsf-fares": wsfFaresApiMeta.baseUrl,
  "wsf-schedule": wsfScheduleApiMeta.baseUrl,
  "wsf-terminals": wsfTerminalsApiMeta.baseUrl,
  "wsf-vessels": wsfVesselsApiMeta.baseUrl,
} as const;

/**
 * Creates a minimal FetchEndpoint for cache flush date endpoints
 *
 * These are simple GET requests with no parameters.
 *
 * @param baseUrl - The base URL for the API (e.g., "https://www.wsdot.wa.gov/ferries/api/vessels/rest")
 * @returns A FetchEndpoint object configured for the cache flush date endpoint
 */
const createCacheFlushEndpoint = (
  baseUrl: string
): FetchEndpoint<Record<string, never>, CacheFlushDateOutput> => ({
  urlTemplate: `${baseUrl}/cacheflushdate`,
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
});

/**
 * Fetches and normalizes cache flush date for a given API
 *
 * @param apiName - The name of the API (must be one of the WSF APIs with cache flush support)
 * @param fetchMode - Optional fetch mode to use (default: "native")
 * @returns Promise resolving to the normalized cache flush date as an ISO string
 * @throws Error if the API name is not found in the base URL mapping
 */
const fetchCacheFlushDate = async (
  apiName: CacheFlushApiName,
  fetchMode: "native" | "jsonp" = "native"
): Promise<string> => {
  const baseUrl = CACHE_FLUSH_BASE_URLS[apiName];
  if (!baseUrl) {
    throw new Error(`No base URL found for API: ${apiName}`);
  }

  const result = await fetchDottie({
    endpoint: createCacheFlushEndpoint(baseUrl),
    fetchMode,
    validate: false,
    logMode: "none",
  });

  return normalizeFlushDate(result);
};

/**
 * Generates endpoint ID in format "api-name:fetchCacheFlushDateApiName"
 *
 * Converts API names like "wsf-vessels" to function names like "fetchCacheFlushDateVessels".
 *
 * @param apiName - The name of the API (e.g., "wsf-vessels")
 * @returns Endpoint ID string in format "api-name:functionName"
 */
const getEndpointId = (apiName: CacheFlushApiName): string => {
  const functionName = `fetchCacheFlushDate${apiName
    .replace("wsf-", "")
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join("")}`;
  return `${apiName}:${functionName}`;
};

/**
 * Normalizes cache flush date value to a consistent string format
 *
 * Converts Date objects to ISO strings, other values to strings.
 * Returns empty string for falsy values.
 *
 * @param value - The cache flush date value (can be Date, string, or other)
 * @returns Normalized date string (ISO format for Dates, empty string for falsy values)
 */
const normalizeFlushDate = (value: CacheFlushDateOutput): string => {
  if (!value) {
    return "";
  }
  return value instanceof Date ? value.toISOString() : String(value);
};

/**
 * Hook to poll cache flush date endpoint
 *
 * Automatically polls the cache flush date endpoint every 5 minutes for WSF APIs
 * with cache flush support. Returns an empty string for APIs without cache flush support.
 *
 * @param apiName - The name of the API (e.g., "wsf-vessels")
 * @param fetchMode - Optional fetch mode to use (default: "native"). Should match the fetchMode used by the underlying hook to ensure consistent behavior
 * @returns UseQueryResult containing the cache flush date as an ISO string, or empty string for unsupported APIs
 */
export const useCacheFlushDate = (
  apiName: string,
  fetchMode: "native" | "jsonp" = "native"
): UseQueryResult<string, Error> => {
  const isCacheFlushApi = CACHE_FLUSH_API_NAMES.has(
    apiName as CacheFlushApiName
  );
  const endpointId = isCacheFlushApi
    ? getEndpointId(apiName as CacheFlushApiName)
    : "no-cache-flush";

  return useQuery({
    queryKey: [endpointId, fetchMode],
    queryFn: isCacheFlushApi
      ? () => fetchCacheFlushDate(apiName as CacheFlushApiName, fetchMode)
      : () => Promise.resolve(""),
    refetchInterval: isCacheFlushApi ? 5 * 60 * 1000 : undefined,
    staleTime: isCacheFlushApi ? 5 * 60 * 1000 : undefined,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to handle cache invalidation when flush date changes
 *
 * Monitors the cache flush date query and invalidates the specified endpoint's
 * queries when the flush date changes, ensuring fresh data is fetched.
 *
 * @param endpointId - The endpoint ID to invalidate when flush date changes
 * @param flushDateQuery - Optional React Query result from useCacheFlushDate hook
 * @returns void
 */
export const useInvalidateOnFlushChange = (
  endpointId: string,
  flushDateQuery?: UseQueryResult<string, Error>
): void => {
  const queryClient = useQueryClient();
  const previousFlushDateRef = React.useRef<string | null>(null);

  useEffect(() => {
    if (!flushDateQuery?.data) {
      return;
    }

    const currentFlushDate = flushDateQuery.data;
    if (
      previousFlushDateRef.current !== null &&
      previousFlushDateRef.current !== currentFlushDate
    ) {
      queryClient.invalidateQueries({ queryKey: [endpointId] });
    }
    previousFlushDateRef.current = currentFlushDate;
  }, [flushDateQuery?.data, queryClient, endpointId]);
};
