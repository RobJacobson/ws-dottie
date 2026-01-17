import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type SailingsByRouteIDInput,
  sailingsByRouteIDInputSchema,
} from "./shared/sailings.input";
import { type Sailing, sailingSchema } from "./shared/sailings.output";

/**
 * Metadata for the fetchSailingsByRouteID endpoint
 */
export const sailingsByRouteIDMeta = {
  functionName: "fetchSailingsByRouteID",
  endpoint: "/sailings/{SchedRouteID}",
  inputSchema: sailingsByRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2445 },
  endpointDescription: "List active sailings for specified scheduled route.",
  toolDescription: {
    purpose:
      "List active sailing schedule data for a scheduled route with complete journey and vessel information.",
    useWhen: [
      "accessing current sailing schedules for planning",
      "building route-specific schedule displays",
      "getting vessel assignments and terminal sequences",
    ],
    avoidWhen: [
      "you need inactive sailings too (prefer fetchAllSailingsBySchedRouteID)",
      "you need today's real-time schedule (prefer fetchScheduleTodayByRoute)",
    ],
    inputs: ["SchedRouteID: from fetchScheduledRoutes → SchedRouteID"],
    returns: "array — active sailings for scheduled route (large payload)",
    outputHighlights: [
      "IDs: ScheduleID, SchedRouteID, RouteID, SailingID",
      "Sailing details: SailingDescription, SailingNotes, SailingDir (1=Westbound, 2=Eastbound)",
      "Operation: DayOpDescription, DayOpUseForHoliday, DisplayColNum",
      "Date ranges: ActiveDateRanges array with DateFrom, DateThru, EventID, EventDescription",
      "Journeys: Journs array with vessel assignments, terminal stops, departure/arrival times",
      "Vessel info: VesselID, VesselName, VesselHandicapAccessible in each journey",
      "Terminal sequence: TerminalID, TerminalName, Departing/Arriving times in each journey",
    ],
    chaining: [
      "fetchScheduledRoutes → extract SchedRouteID → call fetchSailingsByRouteID with { SchedRouteID: ... }",
      "fetchRoutesByTripDate → extract RouteID → call fetchSailingsByRouteID (may need SchedRouteID lookup)",
    ],
  },
} satisfies EndpointMeta<SailingsByRouteIDInput, Sailing[]>;

/**
 * Factory result for sailings by route ID
 */
const sailingsByRouteIDFactory = createFetchAndHook<
  SailingsByRouteIDInput,
  Sailing[]
>({
  api: wsfScheduleApiMeta,
  endpoint: sailingsByRouteIDMeta,
  getEndpointGroup: () => require("./shared/sailings.endpoints").sailingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving active sailings for specified scheduled route
 */
export const { fetch: fetchSailingsByRouteID, hook: useSailingsByRouteID } =
  sailingsByRouteIDFactory;
