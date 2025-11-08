import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduledRoutesResource } from "./scheduledRoutes.endpoints";
import type {
  ScheduledRoutesByIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes.input";
import type { SchedRoute } from "./scheduledRoutes.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduledRoutesResource
);

export const fetchScheduledRoutes: (
  params?: FetchFunctionParams<ScheduledRoutesInput>
) => Promise<SchedRoute[]> = fetchFunctions.fetchScheduledRoutes;

export const fetchScheduledRoutesById: (
  params?: FetchFunctionParams<ScheduledRoutesByIdInput>
) => Promise<SchedRoute[]> = fetchFunctions.fetchScheduledRoutesById;
