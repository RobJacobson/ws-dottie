import type { EndpointGroupMeta } from "@/apis/types";
import { tollTripRatesMeta } from "../tollTripRates";
import { tripRatesByDateMeta } from "../tripRatesByDate";
import { tripRatesByVersionMeta } from "../tripRatesByVersion";

/**
 * Endpoint group metadata for toll trip rates endpoints
 */
export const tollTripRatesGroup: EndpointGroupMeta = {
  name: "toll-trip-rates",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Comprehensive toll rate data for all trips including pricing, messages, and version tracking.",
    description:
      "Container for toll trip rates supporting current data, historical date ranges, and version-specific queries. Includes pricing details, informational messages, and version tracking for transportation planning.",
    useCases: [
      "Retrieve current toll rates for all trips.",
      "Analyze historical toll pricing trends.",
      "Access version-specific rate data for change tracking.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the toll trip rates group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const tollTripRatesEndpoints = {
  tollTripRates: tollTripRatesMeta,
  tripRatesByDate: tripRatesByDateMeta,
  tripRatesByVersion: tripRatesByVersionMeta,
} as const;
