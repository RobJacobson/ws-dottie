import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { cacheFlushDateResource } from "./cacheFlushDate.endpoints";
import type { TerminalsCacheFlushDateInput } from "./cacheFlushDate.input";
import type { TerminalsCacheFlushDate } from "./cacheFlushDate.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  cacheFlushDateResource
);

export const fetchCacheFlushDate = fetchFunctions.fetchCacheFlushDate as (
  params?: FetchFunctionParams<TerminalsCacheFlushDateInput>
) => Promise<TerminalsCacheFlushDate>;
