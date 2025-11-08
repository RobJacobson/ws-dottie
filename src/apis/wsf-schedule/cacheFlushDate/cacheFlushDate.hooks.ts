import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { cacheFlushDateSchedule } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { CacheFlushDateScheduleInput } from "./cacheFlushDate.input";
import type { CacheFlushDateSchedules } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  cacheFlushDateSchedule,
  fetchFunctions
);

export const useCacheFlushDateSchedule: (
  params?: CacheFlushDateScheduleInput,
  options?: QueryHookOptions<CacheFlushDateSchedules>
) => UseQueryResult<CacheFlushDateSchedules, Error> =
  hooks.useCacheFlushDateSchedule;
