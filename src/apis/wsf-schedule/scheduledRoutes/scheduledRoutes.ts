import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for scheduled routes
 */
const scheduledRoutesFactory = createFetchAndHook<
  ScheduledRoutesInput,
  SchedRoute[]
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduledRoutesMeta,
  getEndpointGroup: () =>
    require("./shared/scheduledRoutes.endpoints").scheduledRoutesGroup,
});

/**
 * Fetch function and React Query hook for retrieving all scheduled routes across current and upcoming seasons
 */
export const { fetch: fetchScheduledRoutes, hook: useScheduledRoutes } =
  scheduledRoutesFactory;
