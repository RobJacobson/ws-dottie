import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for scheduled routes by ID
 */
const scheduledRoutesByIdFactory = createFetchAndHook<
  ScheduledRoutesByIdInput,
  SchedRoute[]
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduledRoutesByIdMeta,
  getEndpointGroup: () =>
    require("./shared/scheduledRoutes.endpoints").scheduledRoutesGroup,
});

/**
 * Fetch function and React Query hook for retrieving scheduled routes for a specific schedule season
 */
export const { fetch: fetchScheduledRoutesById, hook: useScheduledRoutesById } =
  scheduledRoutesByIdFactory;
