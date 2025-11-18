import type { EndpointGroupMeta } from "@/apis/types";

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
