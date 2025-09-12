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
import { mapAreasSchema } from "@/schemas/wsdot-highway-alerts";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getMapAreas */
const getMapAreasParamsSchema = z.object({});

/** GetMapAreas params type */

/** Endpoint definition for getMapAreas */
export const getMapAreasDef = defineEndpoint({
  api: "wsdot-highway-alerts",
  function: "getMapAreas",
  endpoint:
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson",
  inputSchema: getMapAreasParamsSchema,
  outputSchema: mapAreasSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});
