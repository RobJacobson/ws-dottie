import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for pass conditions endpoints
 */
export const passConditionsGroup: EndpointGroupMeta = {
  name: "pass-conditions",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time mountain pass conditions including weather, road status, and travel restrictions.",
    description:
      "Current conditions for 15 monitored mountain passes statewide, including temperature, elevation, weather, road surface conditions, and direction-specific travel restrictions.",
    useCases: [
      "Assess pass conditions for winter travel planning.",
      "Monitor weather and road conditions for route decisions.",
      "Check travel restrictions and advisories before mountain travel.",
    ],
    updateFrequency: "15m",
  },
};
