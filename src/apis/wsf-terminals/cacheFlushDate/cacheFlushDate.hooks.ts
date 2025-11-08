import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { cacheFlushDateTerminalsResource } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { CacheFlushDateTerminalsInput } from "./cacheFlushDate.input";
import type { CacheFlushDateTerminals } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  cacheFlushDateTerminalsResource,
  fetchFunctions
);

export const useCacheFlushDateTerminals: (
  params?: CacheFlushDateTerminalsInput,
  options?: QueryHookOptions<CacheFlushDateTerminals>
) => UseQueryResult<CacheFlushDateTerminals, Error> =
  hooks.useCacheFlushDateTerminals;
