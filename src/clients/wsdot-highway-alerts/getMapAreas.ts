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
import { type MapAreas, mapAreasSchema } from "@/schemas/wsdot-highway-alerts";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetchCustom } from "@/shared/fetching";

/** Fetches map areas */
export const getMapAreas = async (
  params: GetMapAreasParams = {}
): Promise<MapAreas> => {
  return zodFetchCustom(
    "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson",
    {
      input: getMapAreasParamsSchema,
      output: mapAreasSchema,
    },
    params
  );
};

/** Params schema for getMapAreas (none) */
export const getMapAreasParamsSchema = z.object({});

/** GetMapAreas params type */
export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

/** Returns options for map areas; polls every 60s */
export const mapAreasOptions = createQueryOptions({
  apiFunction: getMapAreas,
  queryKey: ["wsdot", "highway-alerts", "getMapAreas"],
  cacheStrategy: "MINUTE_UPDATES",
});
