import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleCacheFlushDateResource } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import type { SchedulesCacheFlushDate } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleCacheFlushDateResource,
  fetchFunctions
);

export const useCacheFlushDate = hooks.useCacheFlushDate as (
  params?: CacheFlushDateInput,
  options?: QueryHookOptions<SchedulesCacheFlushDate>
) => UseQueryResult<SchedulesCacheFlushDate, Error>;
