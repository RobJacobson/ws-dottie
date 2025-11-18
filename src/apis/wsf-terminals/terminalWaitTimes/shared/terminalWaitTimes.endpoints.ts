import type { EndpointGroupMeta } from "@/apis/types";
import { terminalWaitTimesMeta } from "../terminalWaitTimes";
import { terminalWaitTimesByTerminalIdMeta } from "../terminalWaitTimesByTerminalId";

/**
 * Endpoint group metadata for terminal wait times endpoints
 */
export const terminalWaitTimesGroup: EndpointGroupMeta = {
  name: "terminal-wait-times",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Wait time conditions and travel tips for vehicles and passengers.",
    description:
      "Current wait conditions and travel recommendations for both vehicles and walk-on passengers at Washington State Ferry terminals including wait time notes, IVR notes, route information, and update dates. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display wait time information and arrival recommendations.",
      "Provide travel tips for optimal departure timing.",
      "Show route-specific wait time conditions.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the terminal wait times group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const terminalWaitTimesEndpoints = {
  terminalWaitTimes: terminalWaitTimesMeta,
  terminalWaitTimesByTerminalId: terminalWaitTimesByTerminalIdMeta,
} as const;
