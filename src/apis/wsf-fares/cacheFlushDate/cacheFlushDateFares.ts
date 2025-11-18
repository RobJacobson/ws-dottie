import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
import { cacheFlushDateFaresGroup } from "./shared/cacheFlushDate.endpoints";

/**
 * Metadata for the fetchCacheFlushDateFares endpoint
 */
export const cacheFlushDateFaresMeta = {
  functionName: "fetchCacheFlushDateFares",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static fares data.",
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

/**
 * Fetch function for retrieving cache flush timestamp for static fares data
 */
export const fetchCacheFlushDateFares: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<CacheFlushDateOutput> = createFetchFunction(
  apis.wsfFares,
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta
);

/**
 * React Query hook for retrieving cache flush timestamp for static fares data
 */
export const useCacheFlushDateFares: (
  params?: FetchFunctionParams<CacheFlushDateInput>,
  options?: QueryHookOptions<CacheFlushDateOutput>
) => UseQueryResult<CacheFlushDateOutput, Error> = createHook(
  apis.wsfFares,
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta
);
