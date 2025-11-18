import type { EndpointGroupMeta } from "@/apis/types";
import { faresValidDateRangeMeta } from "../faresValidDateRange";

/**
 * Endpoint group metadata for valid date range endpoints
 */
export const validDateRangeGroup: EndpointGroupMeta = {
  name: "valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Validity period for published WSF fare data.",
    description:
      "Returns the start and end dates between which fare information is accurate and available for all ferry routes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine valid trip dates for fare queries.",
      "Validate trip date inputs before calling other endpoints.",
      "Display available date ranges in booking interfaces.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the valid date range group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const validDateRangeEndpoints = {
  faresValidDateRange: faresValidDateRangeMeta,
} as const;
