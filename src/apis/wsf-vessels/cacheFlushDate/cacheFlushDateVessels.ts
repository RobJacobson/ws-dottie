import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams, QueryHookOptions } from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
import {
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta,
} from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Fetch function for retrieving cache invalidation timestamp for static vessel data
 */
export const fetchCacheFlushDateVessels: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<CacheFlushDateOutput> = createFetchFunction(
  wsfVesselsApi,
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta
);

/**
 * React Query hook for retrieving cache invalidation timestamp for static vessel data
 */
export const useCacheFlushDateVessels: (
  params?: FetchFunctionParams<CacheFlushDateInput>,
  options?: QueryHookOptions<CacheFlushDateOutput>
) => UseQueryResult<CacheFlushDateOutput, Error> = createHook(
  wsfVesselsApi,
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
export type CacheFlushDateVessels = CacheFlushDateOutput;
