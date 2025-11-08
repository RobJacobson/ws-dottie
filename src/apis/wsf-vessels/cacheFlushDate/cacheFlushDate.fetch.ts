import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
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
