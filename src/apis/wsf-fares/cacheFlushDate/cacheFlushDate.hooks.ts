import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { cacheFlushDateGroup } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import type { FaresCacheFlushDate } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  cacheFlushDateGroup,
  fetchFunctions
);

export const useCacheFlushDate = hooks.useCacheFlushDate as (
  params?: CacheFlushDateInput,
  options?: QueryHookOptions<FaresCacheFlushDate>
) => UseQueryResult<FaresCacheFlushDate, Error>;
