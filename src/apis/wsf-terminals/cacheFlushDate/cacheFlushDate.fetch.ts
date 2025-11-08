import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfTerminalsApi } from "../apiDefinition";
import {
  type CacheFlushDateTerminalsInput,
  type CacheFlushDateTerminals,
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
