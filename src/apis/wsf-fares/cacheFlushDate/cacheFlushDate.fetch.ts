import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { cacheFlushDateGroup } from "./cacheFlushDate.endpoints";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import type { FaresCacheFlushDate } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  cacheFlushDateGroup
);

export const fetchCacheFlushDate = fetchFunctions.fetchCacheFlushDate as (
  params?: FetchFunctionParams<CacheFlushDateInput>
) => Promise<FaresCacheFlushDate>;
