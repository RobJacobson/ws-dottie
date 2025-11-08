import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { cacheFlushDateVesselsResource } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateVesselsInput } from "./cacheFlushDate.input";
import type { CacheFlushDateVessels } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  cacheFlushDateVesselsResource
);

export const fetchCacheFlushDateVessels: (
  params?: FetchFunctionParams<CacheFlushDateVesselsInput>
) => Promise<CacheFlushDateVessels> = fetchFunctions.fetchCacheFlushDateVessels;
