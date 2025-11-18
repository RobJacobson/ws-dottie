import type { EndpointGroupMeta } from "@/apis/types";
import { scheduleValidDateRangeMeta } from "../scheduleValidDateRange";

/**
 * Endpoint group metadata for schedule valid date range endpoints
 */
export const scheduleValidDateRangeGroup: EndpointGroupMeta = {
  name: "schedule-valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Validity period for published WSF schedule data.",
    description:
      "Returns the start and end dates between which schedule information is accurate and available for all ferry routes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine valid trip dates for schedule queries.",
      "Validate trip date inputs before calling other endpoints.",
      "Display available date ranges in booking interfaces.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the schedule valid date range group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const validDateRangeEndpoints = {
  scheduleValidDateRange: scheduleValidDateRangeMeta,
} as const;
