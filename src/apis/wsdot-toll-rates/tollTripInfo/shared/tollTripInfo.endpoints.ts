import type { EndpointGroupMeta } from "@/apis/types";
import { tollTripInfoMeta } from "../tollTripInfo";

/**
 * Endpoint group metadata for toll trip info endpoints
 */
export const tollTripInfoGroup: EndpointGroupMeta = {
  name: "toll-trip-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Trip route information for HOV toll lanes including locations, mileposts, and geometry.",
    description:
      "Reference data for toll trip routes including start and end locations, coordinates, mileposts, travel direction, and optional geometry data for mapping.",
    useCases: [
      "Display toll trip routes on maps.",
      "Look up trip information by location or route.",
      "Build trip selection interfaces for toll rate queries.",
    ],
    updateFrequency: "daily",
  },
  endpoints: [tollTripInfoMeta],
};
