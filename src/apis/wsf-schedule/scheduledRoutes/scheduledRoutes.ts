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
export const fetchScheduledRoutes: FetchFactory<
  ScheduledRoutesInput,
  SchedRoute[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduledRoutesMeta,
});

/**
 * React Query hook for retrieving all scheduled routes across current and upcoming seasons
 */
export const useScheduledRoutes: HookFactory<
  ScheduledRoutesInput,
  SchedRoute[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduledRoutesMeta.functionName,
  fetchFn: fetchScheduledRoutes,
  cacheStrategy: scheduledRoutesGroup.cacheStrategy,
});
