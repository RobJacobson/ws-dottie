import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
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
