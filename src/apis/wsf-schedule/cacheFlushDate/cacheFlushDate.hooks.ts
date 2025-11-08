import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
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
