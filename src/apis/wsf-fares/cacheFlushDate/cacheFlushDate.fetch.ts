import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { cacheFlushDateFaresGroup } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateFaresInput } from "./cacheFlushDate.input";
import type { CacheFlushDateFares } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  cacheFlushDateFaresGroup
);

export const fetchCacheFlushDateFares: (
  params?: FetchFunctionParams<CacheFlushDateFaresInput>
) => Promise<CacheFlushDateFares> = fetchFunctions.fetchCacheFlushDateFares;
