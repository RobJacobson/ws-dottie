import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleCacheFlushDateResource } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import type { SchedulesCacheFlushDate } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleCacheFlushDateResource
);

export const fetchCacheFlushDate: (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<SchedulesCacheFlushDate> = fetchFunctions.fetchCacheFlushDate;
