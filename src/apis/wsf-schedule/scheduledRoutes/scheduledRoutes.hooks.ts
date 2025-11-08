import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduledRoutesResource } from "./scheduledRoutes.endpoints";
import * as fetchFunctions from "./scheduledRoutes.fetch";
import type {
  ScheduledRoutesByIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes.input";
import type { SchedRoute } from "./scheduledRoutes.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduledRoutesResource,
  fetchFunctions
);

export const useScheduledRoutes: (
  params?: ScheduledRoutesInput,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = hooks.useScheduledRoutes;

export const useScheduledRoutesById: (
  params?: ScheduledRoutesByIdInput,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = hooks.useScheduledRoutesById;
