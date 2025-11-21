import type { EndpointGroupMeta } from "@/apis/types";
import { tollTripVersionMeta } from "../tollTripVersion";

/**
 * Endpoint group metadata for toll trip version endpoints
 */
export const tollTripVersionGroup: EndpointGroupMeta = {
  name: "toll-trip-version",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Version and timestamp information for toll trip data.",
    description:
      "Current version number and timestamp for toll trip rates data, enabling cache management and data freshness tracking.",
    useCases: [
      "Check data freshness before fetching toll rates.",
      "Determine when to invalidate cached toll rate data.",
      "Track version changes for toll trip rates.",
    ],
    updateFrequency: "5m",
  },
  endpoints: [tollTripVersionMeta],
};
