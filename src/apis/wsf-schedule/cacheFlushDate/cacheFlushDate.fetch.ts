import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { cacheFlushDateSchedule } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateScheduleInput } from "./cacheFlushDate.input";
import type { CacheFlushDateSchedules } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  cacheFlushDateSchedule
);

export const fetchCacheFlushDateSchedule: (
  params?: FetchFunctionParams<CacheFlushDateScheduleInput>
) => Promise<CacheFlushDateSchedules> =
  fetchFunctions.fetchCacheFlushDateSchedule;
