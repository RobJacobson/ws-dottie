import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import {
  type CacheFlushDateScheduleInput,
  type CacheFlushDateSchedules,
  cacheFlushDateSchedule,
} from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";

const hooks = createHooks(
  wsfScheduleApi,
  cacheFlushDateSchedule,
  fetchFunctions as Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
);

export const useCacheFlushDateSchedule: (
  params?: FetchFunctionParams<CacheFlushDateScheduleInput>,
  options?: QueryHookOptions<CacheFlushDateSchedules>
) => UseQueryResult<CacheFlushDateSchedules, Error> =
  hooks.useCacheFlushDateSchedule as (
    params?: FetchFunctionParams<CacheFlushDateScheduleInput>,
    options?: QueryHookOptions<CacheFlushDateSchedules>
  ) => UseQueryResult<CacheFlushDateSchedules, Error>;
