import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { cacheFlushDateResource } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { TerminalsCacheFlushDateInput } from "./cacheFlushDate.input";
import type { TerminalsCacheFlushDate } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  cacheFlushDateResource,
  fetchFunctions
);

export const useCacheFlushDate = hooks.useCacheFlushDate as (
  params?: TerminalsCacheFlushDateInput,
  options?: QueryHookOptions<TerminalsCacheFlushDate>
) => UseQueryResult<TerminalsCacheFlushDate, Error>;
