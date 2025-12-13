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
  toolDescription: {
    purpose:
      "List all scheduled routes across current and upcoming schedule seasons with route details and contingency information.",
    useWhen: [
      "discovering available scheduled routes for planning",
      "getting route IDs for schedule queries",
      "checking contingency routes and seasonal notes",
    ],
    avoidWhen: [
      "you need routes for a specific season (use ScheduleID parameter)",
      "you need detailed route information (prefer fetchRouteDetailsByTripDate)",
    ],
    inputsHighlights:
      "ScheduleID (optional, from fetchActiveSeasons → ScheduleID to filter by season; omit for all seasons)",
    returns: "array — all scheduled routes across seasons",
    outputHighlights: [
      "IDs: ScheduleID, SchedRouteID, RouteID, RegionID",
      "Route info: RouteAbbrev, Description, SeasonalRouteNotes (HTML)",
      "Contingency: ContingencyOnly flag, ContingencyAdj array with DateFrom/Thru, EventID, AdjType (1=Addition, 2=Cancellation)",
      "Service status: ServiceDisruptions array with BulletinID, BulletinFlag, PublishDate, DisruptionDescription",
    ],
  },
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
