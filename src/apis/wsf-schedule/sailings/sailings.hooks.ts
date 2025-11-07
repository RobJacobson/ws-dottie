import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useAllSailingsBySchedRouteID: (
  params?: AllSailingsBySchedRouteIDInput,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = hooks.useAllSailingsBySchedRouteID;

export const useSailingsByRouteID: (
  params?: SailingsByRouteIDInput,
  options?: QueryHookOptions<Sailing[]>
) => UseQueryResult<Sailing[], Error> = hooks.useSailingsByRouteID;
