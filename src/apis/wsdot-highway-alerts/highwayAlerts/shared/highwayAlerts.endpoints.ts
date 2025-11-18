import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for highway alerts endpoints
 */
export const highwayAlertsGroup: EndpointGroupMeta = {
  name: "highwayAlerts",
  // Using FREQUENT strategy because highway alerts can change every few minutes as incidents occur
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time highway alerts for traffic incidents and road conditions.",
    description:
      "Traffic incidents, construction, maintenance, and other events affecting Washington State highways, including location details, impact levels, timestamps, and event classifications.",
    useCases: [
      "Monitor real-time traffic incidents and road conditions.",
      "Plan alternate routes based on current highway alerts.",
      "Display active alerts filtered by location, region, or category.",
      "Track alert status and estimated resolution times.",
    ],
    updateFrequency: "5m",
  },
};
