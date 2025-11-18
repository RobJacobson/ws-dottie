import type { EndpointGroupMeta } from "@/apis/types";
import { terminalsMeta } from "../terminals";
import { terminalsAndMatesMeta } from "../terminalsAndMates";
import { terminalsAndMatesByRouteMeta } from "../terminalsAndMatesByRoute";

/**
 * Endpoint group metadata for schedule terminals endpoints
 */
export const scheduleTerminalsGroup: EndpointGroupMeta = {
  name: "schedule-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Ferry terminal facilities serving as departure and arrival points.",
    description:
      "Terminals represent dock locations where passengers board and disembark. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal options for trip planning interfaces.",
      "Determine valid terminal pairs for route selection.",
      "Build terminal lookup and navigation features.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the schedule terminals group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const terminalsEndpoints = {
  terminals: terminalsMeta,
  terminalsAndMates: terminalsAndMatesMeta,
  terminalsAndMatesByRoute: terminalsAndMatesByRouteMeta,
} as const;
