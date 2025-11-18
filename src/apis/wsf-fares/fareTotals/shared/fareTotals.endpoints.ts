import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for fare totals endpoints
 */
export const fareTotalsGroup: EndpointGroupMeta = {
  name: "fare-totals",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Calculated fare totals for WSF journeys by selected line items and quantities.",
    description:
      "Fare totals combine individual fare line items with quantities to provide complete pricing breakdowns including departing, return, direction-independent, and grand totals. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Calculate complete journey costs for ticket pricing.",
      "Display fare breakdowns by leg and total amount.",
      "Process payment amounts for ferry trips.",
    ],
    updateFrequency: "daily",
  },
};
