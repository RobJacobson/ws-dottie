import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
  apis.wsfSchedule,
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
  apis.wsfSchedule,
  scheduledRoutesGroup,
  scheduledRoutesMeta
);
