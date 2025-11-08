import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduledRoutesResource } from "./scheduledRoutes.endpoints";
import * as fetchFunctions from "./scheduledRoutes.fetch";
import type {
  ScheduledRoutesByIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes.input";
import type { SchedRoute } from "./scheduledRoutes.output";

const hooks = createHooks(
  wsfScheduleApi,
  scheduledRoutesResource,
  fetchFunctions
);

export const useScheduledRoutes: (
  params?: FetchFunctionParams<ScheduledRoutesInput>,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = hooks.useScheduledRoutes;

export const useScheduledRoutesById: (
  params?: FetchFunctionParams<ScheduledRoutesByIdInput>,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = hooks.useScheduledRoutesById;
