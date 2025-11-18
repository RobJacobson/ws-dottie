import type { EndpointGroupMeta } from "@/apis/types";
import { surfaceMeasurementsMeta } from "../surfaceMeasurements";

/**
 * Endpoint group metadata for surface measurements endpoints
 */
export const surfaceMeasurementsGroup: EndpointGroupMeta = {
  name: "surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Surface sensor measurements from WSDOT weather stations statewide.",
    description:
      "Pavement surface temperature, road freezing temperature, and road surface condition codes from sensors embedded in or mounted on road surfaces.",
    useCases: [
      "Monitor road surface conditions for winter maintenance operations.",
      "Assess pavement temperature and freezing risk.",
      "Evaluate travel safety based on surface condition codes.",
    ],
    updateFrequency: "5m",
  },
};

/**
 * Aggregated endpoint metadata for the surface measurements group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const surfaceMeasurementsEndpoints = {
  surfaceMeasurements: surfaceMeasurementsMeta,
} as const;
