/**
 * @module WSDOT — Highway Alerts: Map Areas
 * @description Map areas used for filtering highway alerts.
 *
 * Provides:
 * - Map area codes and descriptions
 *
 * Data includes:
 * - MapArea code and MapAreaDescription
 *
 * @functions
 *   - getMapAreas: Returns map areas
 *
 * @input
 *   - getMapAreas: {}
 *
 * @output
 *   - getMapAreas: MapAreas
 *   - MapArea fields:
 *     - MapArea: Map area code
 *     - MapAreaDescription: Map area description
 *
 * @cli
 *   - getMapAreas: node dist/cli.mjs getMapAreas
 *
 * @exampleResponse
 * {
 *   "MapArea": "L2CE",
 *   "MapAreaDescription": "Eastern"
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 */
import { z } from "zod";

import {
  type MapAreas,
  mapAreasSchema,
} from "@/schemas/wsdot-highway-alerts/mapArea.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getMapAreas */
const getMapAreasInput = z.object({});

/** Endpoint metadata for getMapAreas */
export const getMapAreasMeta: EndpointDefinition<MapAreasInput, MapAreas> = {
  id: "wsdot-highway-alerts/getMapAreas",
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson",
  inputSchema: getMapAreasInput,
  outputSchema: mapAreasSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type MapAreasInput = z.infer<typeof getMapAreasInput>;
