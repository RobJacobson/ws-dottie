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
} from "@/shared/factories";
import {
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta,
} from "./shared/cacheFlushDate.endpoints";

/**
 * Fetch function for retrieving timestamp of when static wsf-schedule data was last updated
 */
export const fetchCacheFlushDateSchedule: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<CacheFlushDateOutput> = createFetchFunction(
  apis.wsfSchedule,
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta
);

/**
 * React Query hook for retrieving timestamp of when static wsf-schedule data was last updated
 */
export const useCacheFlushDateSchedule: (
  params?: FetchFunctionParams<CacheFlushDateInput>,
  options?: QueryHookOptions<CacheFlushDateOutput>
) => UseQueryResult<CacheFlushDateOutput, Error> = createHook(
  apis.wsfSchedule,
  cacheFlushDateScheduleGroup,
  cacheFlushDateScheduleMeta
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateScheduleInput = CacheFlushDateInput;
export type CacheFlushDateSchedules = CacheFlushDateOutput;
