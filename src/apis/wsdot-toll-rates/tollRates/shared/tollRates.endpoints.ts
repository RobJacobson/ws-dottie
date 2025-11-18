import type { EndpointGroupMeta } from "@/apis/types";
import { tollRatesMeta } from "../tollRates";

/**
 * Endpoint group metadata for toll rates endpoints
 */
export const tollRatesGroup: EndpointGroupMeta = {
  name: "toll-rates",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current toll rates for high occupancy vehicle (HOV) toll lanes statewide.",
    description:
      "Real-time toll pricing data including trip locations, current toll amounts, route associations, and update timestamps for congestion management.",
    useCases: [
      "Calculate travel costs for HOV toll lane usage.",
      "Display current toll amounts in navigation apps.",
      "Make informed routing decisions based on toll pricing.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the toll rates group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const tollRatesEndpoints = {
  tollRates: tollRatesMeta,
} as const;
