import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type { FetchFunctionParams, QueryHookOptions } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
  apis.wsfVessels,
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
  apis.wsfVessels,
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
export type CacheFlushDateVessels = CacheFlushDateOutput;
