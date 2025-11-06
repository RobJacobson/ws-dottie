import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { cacheFlushDateResource } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { VesselsCacheFlushDateInput } from "./cacheFlushDate.input";
import type { VesselsCacheFlushDate } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  cacheFlushDateResource,
  fetchFunctions
);

export const useCacheFlushDate = hooks.useCacheFlushDate as (
  params?: VesselsCacheFlushDateInput,
  options?: QueryHookOptions<VesselsCacheFlushDate>
) => UseQueryResult<VesselsCacheFlushDate, Error>;
