import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleCacheFlushDateResource } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import type { SchedulesCacheFlushDate } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleCacheFlushDateResource
);

export const fetchCacheFlushDate = fetchFunctions.fetchCacheFlushDate as (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<SchedulesCacheFlushDate>;
