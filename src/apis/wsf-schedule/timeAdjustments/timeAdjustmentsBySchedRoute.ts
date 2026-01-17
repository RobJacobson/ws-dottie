import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsBySchedRouteInput,
  timeAdjustmentsBySchedRouteInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustmentsBySchedRoute endpoint
 */
export const timeAdjustmentsBySchedRouteMeta = {
  functionName: "fetchTimeAdjustmentsBySchedRoute",
  endpoint: "/timeadjbyschedroute/{SchedRouteID}",
  inputSchema: timeAdjustmentsBySchedRouteInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: { SchedRouteID: 2445 },
  endpointDescription: "List time adjustments for a specific scheduled route.",
  toolDescription: {
    purpose:
      "List schedule time adjustments and cancellations for a specific scheduled route.",
    useWhen: [
      "checking schedule deviations for a particular scheduled route",
      "monitoring adjustments affecting specific scheduled routes",
      "getting scheduled route-specific schedule changes",
    ],
    avoidWhen: [
      "you need adjustments for all scheduled routes (prefer fetchTimeAdjustments)",
      "you need adjustments for a route (prefer fetchTimeAdjustmentsByRoute)",
    ],
    inputs: ["SchedRouteID: from fetchScheduledRoutes → SchedRouteID"],
    returns:
      "array — time adjustments for the specified scheduled route (may be empty)",
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
      "fetchScheduledRoutes → extract SchedRouteID → call fetchTimeAdjustmentsBySchedRoute with { SchedRouteID: ... }",
    ],
  },
} satisfies EndpointMeta<TimeAdjustmentsBySchedRouteInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments by scheduled route
 */
const timeAdjustmentsBySchedRouteFactory = createFetchAndHook<
  TimeAdjustmentsBySchedRouteInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsBySchedRouteMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving time adjustments for a specific scheduled route
 */
export const {
  fetch: fetchTimeAdjustmentsBySchedRoute,
  hook: useTimeAdjustmentsBySchedRoute,
} = timeAdjustmentsBySchedRouteFactory;
