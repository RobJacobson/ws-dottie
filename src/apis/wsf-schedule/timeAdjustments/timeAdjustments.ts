import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type TimeAdjustmentsInput,
  timeAdjustmentsInputSchema,
} from "./shared/timeAdjustments.input";
import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./shared/timeAdjustments.output";

/**
 * Metadata for the fetchTimeAdjustments endpoint
 */
export const timeAdjustmentsMeta = {
  functionName: "fetchTimeAdjustments",
  endpoint: "/timeadj",
  inputSchema: timeAdjustmentsInputSchema,
  outputSchema: timeAdjustmentSchema.array(),
  sampleParams: {},
  endpointDescription: "List all time adjustments across all routes.",
  toolDescription: {
    purpose:
      "List all schedule time adjustments and cancellations across all routes and scheduled routes.",
    useWhen: [
      "monitoring all schedule deviations system-wide",
      "checking for tidal adjustments and event-related changes",
      "building comprehensive schedule adjustment tracking",
    ],
    avoidWhen: [
      "you need adjustments for a specific route (prefer fetchTimeAdjustmentsByRoute)",
      "you need adjustments for a specific scheduled route (prefer fetchTimeAdjustmentsBySchedRoute)",
    ],
    inputsHighlights: "none",
    returns: "array — all time adjustments across all routes (large payload)",
    outputHighlights: [
      "Schedule/route info: ScheduleID, SchedRouteID, RouteID, RouteDescription",
      "Sailing details: SailingID, SailingDescription, SailingDir (1=Westbound, 2=Eastbound)",
      "Time adjustment: TimeToAdj (original time), AdjDateFrom/AdjDateThru (adjustment period)",
      "Adjustment type: AdjType (1=Addition, 2=Cancellation), TidalAdj (tidal-related), DepArrIndicator (1=Departure, 2=Arrival)",
      "Vessel/terminal: VesselID, VesselName, TerminalID, TerminalDescription",
      "Events: EventID, EventDescription (reason for adjustment)",
      "Annotations: Additional context and notes for the adjustment",
    ],
  },
} satisfies EndpointMeta<TimeAdjustmentsInput, TimeAdjustment[]>;

/**
 * Factory result for time adjustments
 */
const timeAdjustmentsFactory = createFetchAndHook<
  TimeAdjustmentsInput,
  TimeAdjustment[]
>({
  api: wsfScheduleApiMeta,
  endpoint: timeAdjustmentsMeta,
  getEndpointGroup: () =>
    require("./shared/timeAdjustments.endpoints").timeAdjustmentsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all time adjustments across all routes
 */
export const { fetch: fetchTimeAdjustments, hook: useTimeAdjustments } =
  timeAdjustmentsFactory;
