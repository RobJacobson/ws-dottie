import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for vessel basics endpoints
 */
export const vesselBasicsGroup: EndpointGroupMeta = {
  name: "vessel-basics",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Essential vessel identification and operational status.",
    description:
      "Basic vessel information including names, IDs, classifications, and operational status. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display vessel lists and status in passenger information systems.",
      "Track fleet operational status and availability.",
      "Provide foundation data for vessel selection.",
    ],
  },
};
