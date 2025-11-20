import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchScheduledRoutesById: FetchFactory<
  ScheduledRoutesByIdInput,
  SchedRoute[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduledRoutesByIdMeta,
});

/**
 * React Query hook for retrieving scheduled routes for a specific schedule season
 */
export const useScheduledRoutesById: HookFactory<
  ScheduledRoutesByIdInput,
  SchedRoute[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduledRoutesByIdMeta.functionName,
  fetchFn: fetchScheduledRoutesById,
  cacheStrategy: scheduledRoutesGroup.cacheStrategy,
});
