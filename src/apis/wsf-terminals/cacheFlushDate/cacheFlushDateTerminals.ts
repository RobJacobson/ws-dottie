import type { UseQueryResult } from "@tanstack/react-query";
import { wsfTerminalsApi } from "../api";
import type { FetchFunctionParams, QueryHookOptions } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import {
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta,
} from "./shared/cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./shared/cacheFlushDate.input";
import type { CacheFlushDateOutput } from "./shared/cacheFlushDate.output";

/**
 * Fetch function for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const fetchCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<CacheFlushDateOutput> = createFetchFunction(
  wsfTerminalsApi,
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta
);

/**
 * React Query hook for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const useCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateInput>,
  options?: QueryHookOptions<CacheFlushDateOutput>
) => UseQueryResult<CacheFlushDateOutput, Error> = createHook(
  wsfTerminalsApi,
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
