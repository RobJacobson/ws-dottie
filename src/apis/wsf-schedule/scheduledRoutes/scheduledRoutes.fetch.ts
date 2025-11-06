import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
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

export const fetchScheduledRoutes = fetchFunctions.fetchScheduledRoutes as (
  params?: FetchFunctionParams<ScheduledRoutesInput>
) => Promise<SchedRoute[]>;

export const fetchScheduledRoutesById =
  fetchFunctions.fetchScheduledRoutesById as (
    params?: FetchFunctionParams<ScheduledRoutesByIdInput>
  ) => Promise<SchedRoute[]>;
