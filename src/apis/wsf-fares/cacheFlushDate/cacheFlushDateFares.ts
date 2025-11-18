import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";
import type { FetchFunctionParams, QueryHookOptions } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
import {
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta,
} from "./shared/cacheFlushDate.endpoints";

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
