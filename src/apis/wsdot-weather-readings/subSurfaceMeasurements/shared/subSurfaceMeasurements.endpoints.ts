import type { EndpointGroupMeta } from "@/apis/types";
import { subSurfaceMeasurementsMeta } from "../subSurfaceMeasurements";

/**
 * Endpoint group metadata for sub-surface measurements endpoints
 */
export const subSurfaceMeasurementsGroup: EndpointGroupMeta = {
  name: "sub-surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Subsurface temperature measurements from sensors embedded below road pavement.",
    description:
      "Ground temperature data from sensors embedded 12-18 inches below road pavement surfaces for monitoring ground temperature conditions.",
    useCases: [
      "Monitor ground temperature conditions for winter maintenance operations.",
      "Predict road surface conditions based on subsurface temperature trends.",
      "Assess travel safety by understanding ground temperature patterns.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the sub-surface measurements group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const subSurfaceMeasurementsEndpoints = {
  subSurfaceMeasurements: subSurfaceMeasurementsMeta,
} as const;
