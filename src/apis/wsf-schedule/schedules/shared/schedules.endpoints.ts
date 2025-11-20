import type { EndpointGroupMeta } from "@/apis/types";
import { scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta } from "../scheduleByTripDateAndDepartingTerminalIdAndTerminalIds";
import { scheduleByTripDateAndRouteIdMeta } from "../scheduleByTripDateAndRouteId";

/**
 * Endpoint group metadata for schedules endpoints
 */
export const schedulesGroup: EndpointGroupMeta = {
  name: "schedules",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Complete sailing timetables for ferry routes.",
    description:
      "Sailing schedules including departure times, arrival times, vessel assignments, and route-specific information. Accounts for contingencies, sailing date ranges, and time adjustments. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Plan ferry travel with complete sailing timetables.",
      "Look up departure and arrival times for specific dates.",
      "View vessel assignments and loading rules for sailings.",
    ],
  },
  endpoints: [
    scheduleByTripDateAndRouteIdMeta,
    scheduleByTripDateAndDepartingTerminalIdAndTerminalIdsMeta,
  ],
};
