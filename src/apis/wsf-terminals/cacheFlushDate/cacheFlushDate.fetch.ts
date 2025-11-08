import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import {
  type CacheFlushDateTerminals,
  type CacheFlushDateTerminalsInput,
  cacheFlushDateTerminalsResource,
} from "./cacheFlushDate.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  cacheFlushDateTerminalsResource
);

export const fetchCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateTerminalsInput>
) => Promise<CacheFlushDateTerminals> =
  fetchFunctions.fetchCacheFlushDateTerminals as (
    params?: FetchFunctionParams<CacheFlushDateTerminalsInput>
  ) => Promise<CacheFlushDateTerminals>;
