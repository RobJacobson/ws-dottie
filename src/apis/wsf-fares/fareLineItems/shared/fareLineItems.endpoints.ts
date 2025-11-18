import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for fare line items endpoints
 */
export const fareLineItemsGroup: EndpointGroupMeta = {
  name: "fare-line-items",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Individual fare components for WSF routes by passenger and vehicle types.",
    description:
      "Fare line items represent pricing components for different passenger categories, vehicle types, and route combinations. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display fare options for different passenger and vehicle types.",
      "Calculate journey costs based on route and demographics.",
      "Build fare selection interfaces for ticket purchasing.",
    ],
    updateFrequency: "daily",
  },
};
