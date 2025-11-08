import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  type CacheFlushDateVessels,
  type CacheFlushDateVesselsInput,
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
