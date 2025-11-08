import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfVesselsApi } from "../apiDefinition";
import {
  type CacheFlushDateVessels,
  type CacheFlushDateVesselsInput,
  cacheFlushDateVesselsResource,
} from "./cacheFlushDate.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfVesselsApi,
  cacheFlushDateVesselsResource
);

export const fetchCacheFlushDateVessels: (
  params?: FetchFunctionParams<CacheFlushDateVesselsInput>
) => Promise<CacheFlushDateVessels> =
  fetchFunctions.fetchCacheFlushDateVessels as (
    params?: FetchFunctionParams<CacheFlushDateVesselsInput>
  ) => Promise<CacheFlushDateVessels>;
