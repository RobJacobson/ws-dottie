import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  type CacheFlushDateScheduleInput,
  type CacheFlushDateSchedules,
  cacheFlushDateSchedule,
} from "./cacheFlushDate.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  cacheFlushDateSchedule
);

export const fetchCacheFlushDateSchedule: (
  params?: FetchFunctionParams<CacheFlushDateScheduleInput>
) => Promise<CacheFlushDateSchedules> =
  fetchFunctions.fetchCacheFlushDateSchedule as (
    params?: FetchFunctionParams<CacheFlushDateScheduleInput>
  ) => Promise<CacheFlushDateSchedules>;
