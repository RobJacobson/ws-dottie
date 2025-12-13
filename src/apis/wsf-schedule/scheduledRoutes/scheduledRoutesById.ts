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
  toolDescription: {
    purpose:
      "List scheduled routes for a specific schedule season with route details and contingency information.",
    useWhen: [
      "getting routes for a specific season",
      "season-specific route planning",
      "checking which routes are active in a particular schedule",
    ],
    avoidWhen: [
      "you need routes across all seasons (prefer fetchScheduledRoutes)",
      "you don't know the ScheduleID (prefer fetchActiveSeasons first)",
    ],
    inputsHighlights:
      "ScheduleID (required, from fetchActiveSeasons → ScheduleID)",
    returns: "array — scheduled routes for the specified season",
    outputHighlights: [
      "IDs: ScheduleID, SchedRouteID, RouteID, RegionID",
      "Route info: RouteAbbrev, Description, SeasonalRouteNotes (HTML)",
      "Contingency: ContingencyOnly flag, ContingencyAdj array with DateFrom/Thru, EventID, AdjType (1=Addition, 2=Cancellation)",
      "Service status: ServiceDisruptions array with BulletinID, BulletinFlag, PublishDate, DisruptionDescription",
    ],
    chaining: [
      "fetchActiveSeasons → extract ScheduleID → call fetchScheduledRoutesById with { ScheduleID: ... }",
    ],
  },
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
