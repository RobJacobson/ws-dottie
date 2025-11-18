import type { EndpointGroupMeta } from "@/apis/types";
import { vesselBasicsMeta } from "../vesselBasics";
import { vesselBasicsByVesselIdMeta } from "../vesselBasicsByVesselId";

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

/**
 * Aggregated endpoint metadata for the vessel basics group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const vesselBasicsEndpoints = {
  vesselBasics: vesselBasicsMeta,
  vesselBasicsByVesselId: vesselBasicsByVesselIdMeta,
} as const;
