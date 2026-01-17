import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type AllSailingsBySchedRouteIDInput,
  allSailingsBySchedRouteIDInputSchema,
} from "./shared/sailings.input";
import { type Sailing, sailingSchema } from "./shared/sailings.output";

/**
 * Metadata for the fetchAllSailingsBySchedRouteID endpoint
 */
export const allSailingsBySchedRouteIDMeta = {
  functionName: "fetchAllSailingsBySchedRouteID",
  endpoint: "/allsailings/{SchedRouteID}",
  inputSchema: allSailingsBySchedRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2445 },
  endpointDescription:
    "List all sailings for scheduled route including inactive sailings.",
  toolDescription: {
    purpose:
      "List comprehensive sailing schedule data for a scheduled route, including inactive sailings and complete journey information.",
    useWhen: [
      "accessing complete sailing schedules for analysis",
      "building schedule management interfaces",
      "working with historical or inactive sailing data",
    ],
    avoidWhen: [
      "you only need active sailings (prefer fetchSailingsByRouteID)",
      "you need today's schedule (prefer fetchScheduleTodayByRoute)",
    ],
    inputs: ["SchedRouteID: from fetchScheduledRoutes → SchedRouteID"],
    returns: "array — all sailings for scheduled route (large payload)",
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
      "fetchScheduledRoutes → extract SchedRouteID → call fetchAllSailingsBySchedRouteID with { SchedRouteID: ... }",
    ],
  },
} satisfies EndpointMeta<AllSailingsBySchedRouteIDInput, Sailing[]>;

/**
 * Factory result for all sailings by scheduled route ID
 */
const allSailingsBySchedRouteIDFactory = createFetchAndHook<
  AllSailingsBySchedRouteIDInput,
  Sailing[]
>({
  api: wsfScheduleApiMeta,
  endpoint: allSailingsBySchedRouteIDMeta,
  getEndpointGroup: () => require("./shared/sailings.endpoints").sailingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all sailings for scheduled route including inactive sailings
 */
export const {
  fetch: fetchAllSailingsBySchedRouteID,
  hook: useAllSailingsBySchedRouteID,
} = allSailingsBySchedRouteIDFactory;
