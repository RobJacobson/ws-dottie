import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { cacheFlushDateVesselsResource } from "./cacheFlushDate.endpoints";
import * as fetchFunctions from "./cacheFlushDate.fetch";
import type { CacheFlushDateVesselsInput } from "./cacheFlushDate.input";
import type { CacheFlushDateVessels } from "./cacheFlushDate.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  cacheFlushDateVesselsResource,
  fetchFunctions
);

export const useCacheFlushDateVessels: (
  params?: CacheFlushDateVesselsInput,
  options?: QueryHookOptions<CacheFlushDateVessels>
) => UseQueryResult<CacheFlushDateVessels, Error> =
  hooks.useCacheFlushDateVessels;
