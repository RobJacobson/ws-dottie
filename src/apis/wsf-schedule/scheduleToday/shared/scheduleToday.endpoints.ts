import type { EndpointGroupMeta } from "@/apis/types";
import { scheduleTodayByRouteMeta } from "../scheduleTodayByRoute";
import { scheduleTodayByTerminalsMeta } from "../scheduleTodayByTerminals";

/**
 * Endpoint group metadata for schedule today endpoints
 */
export const scheduleTodayGroup: EndpointGroupMeta = {
  name: "schedule-today",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Today's sailing schedule for ferry routes.",
    description:
      "Current day sailing information with option to show only remaining departures. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Show today's remaining sailings in real-time apps.",
      "Display current day schedule with all departures.",
      "Filter to only upcoming sailings for today.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the schedule today group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const scheduleTodayEndpoints = {
  scheduleTodayByRoute: scheduleTodayByRouteMeta,
  scheduleTodayByTerminals: scheduleTodayByTerminalsMeta,
} as const;
