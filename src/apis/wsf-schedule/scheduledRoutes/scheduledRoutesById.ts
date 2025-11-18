import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { scheduledRoutesGroup } from "./shared/scheduledRoutes.endpoints";
import {
  type ScheduledRoutesByIdInput,
  scheduledRoutesByIdInputSchema,
} from "./shared/scheduledRoutes.input";
import {
  type SchedRoute,
  schedRouteSchema,
} from "./shared/scheduledRoutes.output";

/**
 * Metadata for the fetchScheduledRoutesById endpoint
 */
export const scheduledRoutesByIdMeta = {
  functionName: "fetchScheduledRoutesById",
  endpoint: "/schedroutes/{ScheduleID}",
  inputSchema: scheduledRoutesByIdInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: { ScheduleID: 193 },
  endpointDescription: "List scheduled routes for a specific schedule season.",
} satisfies EndpointMeta<ScheduledRoutesByIdInput, SchedRoute[]>;

/**
 * Fetch function for retrieving scheduled routes for a specific schedule season
 */
export const fetchScheduledRoutesById: (
  params?: FetchFunctionParams<ScheduledRoutesByIdInput>
) => Promise<SchedRoute[]> = createFetchFunction(
  wsfScheduleApi.api,
  scheduledRoutesGroup,
  scheduledRoutesByIdMeta
);

/**
 * React Query hook for retrieving scheduled routes for a specific schedule season
 */
export const useScheduledRoutesById: (
  params?: FetchFunctionParams<ScheduledRoutesByIdInput>,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = createHook(
  wsfScheduleApi.api,
  scheduledRoutesGroup,
  scheduledRoutesByIdMeta
);
