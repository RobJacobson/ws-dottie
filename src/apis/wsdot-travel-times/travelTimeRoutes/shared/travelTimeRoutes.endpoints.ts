import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for travel time routes endpoints
 */
export const travelTimeRoutesGroup: EndpointGroupMeta = {
  name: "travel-time-routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Current and average travel times for major Washington State highway routes.",
    description:
      "Travel time data for routes in Seattle, Tacoma, and Snoqualmie Pass areas, including distance, start/end points, and comparison of current vs. average times.",
    useCases: [
      "Plan travel routes and estimate arrival times.",
      "Compare current conditions against historical averages to identify delays.",
      "Optimize departure times based on real-time traffic conditions.",
    ],
    updateFrequency: "5m",
  },
};
