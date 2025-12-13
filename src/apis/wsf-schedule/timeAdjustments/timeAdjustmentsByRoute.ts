import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsByRouteInput,
  timeAdjustmentsByRouteInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustmentsByRoute endpoint
 */
export const timeAdjustmentsByRouteMeta = {
  functionName: "fetchTimeAdjustmentsByRoute",
  endpoint: "/timeadjbyroute/{RouteID}",
  inputSchema: timeAdjustmentsByRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { RouteID: 1 },
  endpointDescription: "List time adjustments for a specific route.",
  toolDescription: {
    purpose:
      "List schedule time adjustments and cancellations for a specific route.",
    useWhen: [
      "checking schedule deviations for a particular route",
      "monitoring tidal adjustments affecting specific routes",
      "getting route-specific schedule changes",
    ],
    avoidWhen: [
      "you need adjustments for all routes (prefer fetchTimeAdjustments)",
      "you need adjustments for a scheduled route (prefer fetchTimeAdjustmentsBySchedRoute)",
    ],
    inputs: ["RouteID: from fetchRoutesByTripDate → RouteID"],
    returns: "array — time adjustments for the specified route (may be empty)",
    outputHighlights: [
      "Schedule/route info: ScheduleID, SchedRouteID, RouteID, RouteDescription",
      "Sailing details: SailingID, SailingDescription, SailingDir (1=Westbound, 2=Eastbound)",
      "Time adjustment: TimeToAdj (original time), AdjDateFrom/AdjDateThru (adjustment period)",
      "Adjustment type: AdjType (1=Addition, 2=Cancellation), TidalAdj (tidal-related), DepArrIndicator (1=Departure, 2=Arrival)",
      "Vessel/terminal: VesselID, VesselName, TerminalID, TerminalDescription",
      "Events: EventID, EventDescription (reason for adjustment)",
      "Annotations: Additional context and notes for the adjustment",
    ],
    chaining: [
      "fetchRoutesByTripDate → extract RouteID → call fetchTimeAdjustmentsByRoute with { RouteID: ... }",
    ],
  },
} satisfies EndpointMeta<TimeAdjustmentsByRouteInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments by route
 */
const timeAdjustmentsByRouteFactory = createFetchAndHook<
  TimeAdjustmentsByRouteInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving time adjustments for a specific route
 */
export const {
  fetch: fetchTimeAdjustmentsByRoute,
  hook: useTimeAdjustmentsByRoute,
} = timeAdjustmentsByRouteFactory;
