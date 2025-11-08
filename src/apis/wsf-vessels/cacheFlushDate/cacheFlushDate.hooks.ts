import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfVesselsApi } from "../apiDefinition";
import {
  type CacheFlushDateVesselsInput,
  type CacheFlushDateVessels,
  cacheFlushDateVesselsResource,
} from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";

const hooks = createHooks(
  wsfVesselsApi,
  cacheFlushDateVesselsResource,
  fetchFunctions as Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
);

export const useCacheFlushDateVessels: (
  params?: FetchFunctionParams<CacheFlushDateVesselsInput>,
  options?: QueryHookOptions<CacheFlushDateVessels>
) => UseQueryResult<CacheFlushDateVessels, Error> =
  hooks.useCacheFlushDateVessels as (
    params?: FetchFunctionParams<CacheFlushDateVesselsInput>,
    options?: QueryHookOptions<CacheFlushDateVessels>
  ) => UseQueryResult<CacheFlushDateVessels, Error>;
