import type { UseQueryResult } from "@tanstack/react-query";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import {
  type CacheFlushDateTerminals,
  type CacheFlushDateTerminalsInput,
  cacheFlushDateTerminalsResource,
} from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";

const hooks = createHooks(
  wsfTerminalsApi,
  cacheFlushDateTerminalsResource,
  fetchFunctions as Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
);

export const useCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateTerminalsInput>,
  options?: QueryHookOptions<CacheFlushDateTerminals>
) => UseQueryResult<CacheFlushDateTerminals, Error> =
  hooks.useCacheFlushDateTerminals as (
    params?: FetchFunctionParams<CacheFlushDateTerminalsInput>,
    options?: QueryHookOptions<CacheFlushDateTerminals>
  ) => UseQueryResult<CacheFlushDateTerminals, Error>;
