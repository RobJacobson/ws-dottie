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
  type ScheduledRoutesInput,
  scheduledRoutesInputSchema,
} from "./shared/scheduledRoutes.input";
import {
  type SchedRoute,
  schedRouteSchema,
} from "./shared/scheduledRoutes.output";

/**
 * Metadata for the fetchScheduledRoutes endpoint
 */
export const scheduledRoutesMeta = {
  functionName: "fetchScheduledRoutes",
  endpoint: "/schedroutes",
  inputSchema: scheduledRoutesInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List all scheduled routes across current and upcoming seasons.",
} satisfies EndpointMeta<ScheduledRoutesInput, SchedRoute[]>;

/**
 * Fetch function for retrieving all scheduled routes across current and upcoming seasons
 */
export const fetchScheduledRoutes: (
  params?: FetchFunctionParams<ScheduledRoutesInput>
) => Promise<SchedRoute[]> = createFetchFunction(
  wsfScheduleApi.api,
  scheduledRoutesGroup,
  scheduledRoutesMeta
);

/**
 * React Query hook for retrieving all scheduled routes across current and upcoming seasons
 */
export const useScheduledRoutes: (
  params?: FetchFunctionParams<ScheduledRoutesInput>,
  options?: QueryHookOptions<SchedRoute[]>
) => UseQueryResult<SchedRoute[], Error> = createHook(
  wsfScheduleApi.api,
  scheduledRoutesGroup,
  scheduledRoutesMeta
);
