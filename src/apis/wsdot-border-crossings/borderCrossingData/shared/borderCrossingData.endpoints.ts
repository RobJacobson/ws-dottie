import type { EndpointGroupMeta } from "@/apis/types";
import { borderCrossingsMeta } from "@/apis/wsdot-border-crossings/borderCrossingData/borderCrossings";

/**
 * Endpoint group metadata for border crossing data endpoints
 */
export const borderCrossingDataGroup: EndpointGroupMeta = {
  name: "border-crossing-data",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current wait times for Washington border crossings into Canada by crossing and lane type.",
    description:
      "Snapshot wait-time data for I-5, SR-543, SR-539, and SR-9 crossings, covering general, Nexus, and truck lanes.",
    useCases: [
      "Plan trips into Canada based on current border wait times.",
      "Compare wait times across crossings and lane types.",
      "Show live wait-time information in traveler or operations dashboards.",
    ],
    updateFrequency: "1m",
  },
};

/**
 * Aggregated endpoint metadata for the border crossing data group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const borderCrossingDataEndpoints = {
  borderCrossings: borderCrossingsMeta,
} as const;
