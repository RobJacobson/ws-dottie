import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for routes endpoints
 */
export const routesGroup: EndpointGroupMeta = {
  name: "routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Basic ferry route information between terminals.",
    description:
      "Route identification including route IDs, abbreviations, descriptions, region associations, and service disruptions.",
    useCases: [
      "Discover available routes for a trip date.",
      "Identify routes by terminal combinations.",
      "Check for active service disruptions on routes.",
    ],
    updateFrequency: "daily",
  },
};
