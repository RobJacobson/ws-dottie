import type { EndpointGroupMeta } from "@/apis/types";
import { trafficFlowByIdMeta } from "../trafficFlowById";
import { trafficFlowsMeta } from "../trafficFlows";

/**
 * Endpoint group metadata for flow data endpoints
 */
export const flowDataGroup: EndpointGroupMeta = {
  name: "flow-data",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time traffic flow conditions from sensor stations across Washington state.",
    description:
      "Current traffic flow readings, station locations, and timestamps for traffic monitoring and congestion detection.",
    useCases: [
      "Monitor real-time traffic flow conditions across Washington highways.",
      "Detect congestion and traffic patterns for route planning.",
      "Display current traffic status in traveler information systems.",
    ],
    updateFrequency: "90s",
  },
};

/**
 * Aggregated endpoint metadata for the flow data group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const flowDataEndpoints = {
  trafficFlowById: trafficFlowByIdMeta,
  trafficFlows: trafficFlowsMeta,
} as const;
