import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfTerminalsApiMeta } from "../apiMeta";
import {
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta,
} from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Fetch function for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const fetchCacheFlushDateTerminals: FetchFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createFetchFunction({
  api: wsfTerminalsApiMeta,
  endpoint: cacheFlushDateTerminalsMeta,
});

/**
 * React Query hook for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const useCacheFlushDateTerminals: HookFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createHook({
  apiName: wsfTerminalsApiMeta.name,
  endpointName: cacheFlushDateTerminalsMeta.functionName,
  fetchFn: fetchCacheFlushDateTerminals,
  cacheStrategy: cacheFlushDateTerminalsGroup.cacheStrategy,
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
