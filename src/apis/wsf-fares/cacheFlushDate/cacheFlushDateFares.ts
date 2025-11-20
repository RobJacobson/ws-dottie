import type {
  CacheFlushDateInput,
  CacheFlushDateOutput,
} from "@/apis/shared/cacheFlushDate";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfFaresApiMeta } from "../apiMeta";
import {
  cacheFlushDateFaresGroup,
  cacheFlushDateFaresMeta,
} from "./shared/cacheFlushDate.endpoints";

/**
 * Fetch function for retrieving cache flush timestamp for static fares data
 */
export const fetchCacheFlushDateFares: FetchFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: cacheFlushDateFaresMeta,
});

/**
 * React Query hook for retrieving cache flush timestamp for static fares data
 */
export const useCacheFlushDateFares: HookFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: cacheFlushDateFaresMeta.functionName,
  fetchFn: fetchCacheFlushDateFares,
  cacheStrategy: cacheFlushDateFaresGroup.cacheStrategy,
});
