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
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta,
} from "./shared/cacheFlushDate.endpoints";

/**
 * Fetch function for retrieving timestamp of when static wsf-schedule data was last updated
 */
export const fetchCacheFlushDateSchedule: FetchFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: cacheFlushDateScheduleMeta,
});

/**
 * React Query hook for retrieving timestamp of when static wsf-schedule data was last updated
 */
export const useCacheFlushDateSchedule: HookFactory<
  CacheFlushDateInput,
  CacheFlushDateOutput
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: cacheFlushDateScheduleMeta.functionName,
  fetchFn: fetchCacheFlushDateSchedule,
  cacheStrategy: cacheFlushDateScheduleGroup.cacheStrategy,
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateScheduleInput = CacheFlushDateInput;
export type CacheFlushDateSchedules = CacheFlushDateOutput;
