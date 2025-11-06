import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { sailingsResource } from "./sailings.endpoints";
import * as fetchFunctions from "./sailings.fetch";
import type {
  AllSailingsBySchedRouteIDInput,
  SailingsByRouteIDInput,
} from "./sailings.input";
import type { Sailing } from "./sailings.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  sailingsResource,
  fetchFunctions
);

export const useAllSailingsBySchedRouteID =
  hooks.useAllSailingsBySchedRouteID as (
    params?: AllSailingsBySchedRouteIDInput,
    options?: QueryHookOptions<Sailing[]>
  ) => UseQueryResult<Sailing[], Error>;

export const useSailingsByRouteID = hooks.useSailingsByRouteID as (
  params?: SailingsByRouteIDInput,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error>;
