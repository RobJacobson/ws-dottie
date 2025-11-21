import type { EndpointGroupMeta } from "@/apis/types";
import { vesselHistoriesMeta } from "../vesselHistories";
import { vesselHistoriesByVesselNameAndDateRangeMeta } from "../vesselHistoriesByVesselNameAndDateRange";

/**
 * Endpoint group metadata for vessel histories endpoints
 */
export const vesselHistoriesGroup: EndpointGroupMeta = {
  name: "vessel-histories",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Historical sailing records for WSF vessels.",
    description:
      "Historical voyage data including departure and arrival terminals, scheduled and actual departure times, and estimated arrival times. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Analyze on-time performance and voyage patterns.",
      "Track historical vessel movements and routes.",
      "Generate reports on operational history.",
    ],
  },
  endpoints: [vesselHistoriesMeta, vesselHistoriesByVesselNameAndDateRangeMeta],
};
