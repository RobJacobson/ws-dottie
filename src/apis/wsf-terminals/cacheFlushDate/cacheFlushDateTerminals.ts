import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
import { cacheFlushDateTerminalsGroup } from "./shared/cacheFlushDate.endpoints";
import {
  type CacheFlushDateInput,
  cacheFlushDateInputSchema,
} from "./shared/cacheFlushDate.input";
import {
  type CacheFlushDateOutput,
  cacheFlushDateOutputSchema,
} from "./shared/cacheFlushDate.output";

/**
 * Metadata for the fetchCacheFlushDateTerminals endpoint
 */
export const cacheFlushDateTerminalsMeta = {
  functionName: "fetchCacheFlushDateTerminals",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Get cache invalidation timestamp for static wsf-terminals data.",
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

/**
 * Fetch function for retrieving cache invalidation timestamp for static wsf-terminals data
 */
export const fetchCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<CacheFlushDateOutput> = createFetchFunction(
  apis.wsfTerminals,
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
  apis.wsfTerminals,
  cacheFlushDateTerminalsGroup,
  cacheFlushDateTerminalsMeta
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
