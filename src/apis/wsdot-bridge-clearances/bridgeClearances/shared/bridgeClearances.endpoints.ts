import type { EndpointGroupMeta } from "@/apis/types";
import { bridgeClearancesMeta } from "../bridgeClearances";
import { bridgeClearancesByRouteMeta } from "../bridgeClearancesByRoute";

/**
 * Endpoint group metadata for bridge clearances endpoints
 */
export const bridgeClearancesGroup: EndpointGroupMeta = {
  name: "bridge-clearances",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Vertical clearance measurements for Washington State bridges.",
    description:
      "Bridge height restrictions including location data, route associations, and clearance measurements in both feet-inches and inches formats.",
    useCases: [
      "Plan commercial vehicle routes with height restrictions.",
      "Verify clearance requirements for oversize load permits.",
      "Identify bridge height limitations for route planning.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the bridge clearances group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const bridgeClearancesEndpoints = {
  bridgeClearances: bridgeClearancesMeta,
  bridgeClearancesByRoute: bridgeClearancesByRouteMeta,
} as const;
