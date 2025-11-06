import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { cacheFlushDateResource } from "./cacheFlushDate.endpoints";
import type { VesselsCacheFlushDateInput } from "./cacheFlushDate.input";
import type { VesselsCacheFlushDate } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  cacheFlushDateResource
);

export const fetchCacheFlushDate = fetchFunctions.fetchCacheFlushDate as (
  params?: FetchFunctionParams<VesselsCacheFlushDateInput>
) => Promise<VesselsCacheFlushDate>;
