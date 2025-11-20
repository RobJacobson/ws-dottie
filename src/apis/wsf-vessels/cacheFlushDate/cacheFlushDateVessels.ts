import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  cacheFlushDateVesselsGroup,
  cacheFlushDateVesselsMeta,
} from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Fetch function for retrieving cache invalidation timestamp for static vessel data
 */
export const fetchCacheFlushDateVessels: FetchFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: cacheFlushDateVesselsMeta,
});

/**
 * React Query hook for retrieving cache invalidation timestamp for static vessel data
 */
export const useCacheFlushDateVessels: HookFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: cacheFlushDateVesselsMeta.functionName,
  fetchFn: fetchCacheFlushDateVessels,
  cacheStrategy: cacheFlushDateVesselsGroup.cacheStrategy,
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
export type CacheFlushDateVessels = CacheFlushDateOutput;
