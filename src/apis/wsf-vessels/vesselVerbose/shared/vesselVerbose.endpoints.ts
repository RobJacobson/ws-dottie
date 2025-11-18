import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for vessel verbose endpoints
 */
export const vesselVerboseGroup: EndpointGroupMeta = {
  name: "vessel-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Complete vessel information combining basics, stats, and accommodations.",
    description:
      "Comprehensive vessel profiles combining identification, operational status, technical specifications, and amenities in a single response. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display complete vessel profiles in passenger information systems.",
      "Reduce API calls by fetching all vessel data at once.",
      "Support comprehensive vessel comparison and selection.",
    ],
  },
};
