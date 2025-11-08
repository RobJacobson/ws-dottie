import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  type CacheFlushDateFares,
  type CacheFlushDateFaresInput,
  cacheFlushDateFaresGroup,
} from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";

const hooks = createHooks(
  wsfFaresApi,
  cacheFlushDateFaresGroup,
  fetchFunctions as Record<
    string,
    (params?: FetchFunctionParams<unknown>) => Promise<unknown>
  >
);

export const useCacheFlushDateFares: (
  params?: FetchFunctionParams<CacheFlushDateFaresInput>,
  options?: QueryHookOptions<CacheFlushDateFares>
) => UseQueryResult<CacheFlushDateFares, Error> =
  hooks.useCacheFlushDateFares as (
    params?: FetchFunctionParams<CacheFlushDateFaresInput>,
    options?: QueryHookOptions<CacheFlushDateFares>
  ) => UseQueryResult<CacheFlushDateFares, Error>;
