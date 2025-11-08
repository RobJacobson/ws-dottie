import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduledRoutesResource } from "./scheduledRoutes.endpoints";
import type {
  ScheduledRoutesByIdInput,
  ScheduledRoutesInput,
} from "./scheduledRoutes.input";
import type { SchedRoute } from "./scheduledRoutes.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduledRoutesResource
);

export const fetchScheduledRoutes: (
  params?: FetchFunctionParams<ScheduledRoutesInput>
) => Promise<SchedRoute[]> = fetchFunctions.fetchScheduledRoutes;

export const fetchScheduledRoutesById: (
  params?: FetchFunctionParams<ScheduledRoutesByIdInput>
) => Promise<SchedRoute[]> = fetchFunctions.fetchScheduledRoutesById;
