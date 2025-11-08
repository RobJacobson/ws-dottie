import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { cacheFlushDateTerminalsResource } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateTerminalsInput } from "./cacheFlushDate.input";
import type { CacheFlushDateTerminals } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  cacheFlushDateTerminalsResource
);

export const fetchCacheFlushDateTerminals: (
  params?: FetchFunctionParams<CacheFlushDateTerminalsInput>
) => Promise<CacheFlushDateTerminals> =
  fetchFunctions.fetchCacheFlushDateTerminals;
