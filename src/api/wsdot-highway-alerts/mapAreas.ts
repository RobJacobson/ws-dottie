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
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Function
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson";

/** Fetches map areas */
export const getMapAreas = async (
  params: GetMapAreasParams = {}
): Promise<MapAreas> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getMapAreasParamsSchema,
      output: mapAreasArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
// ============================================================================

/** Params schema for getMapAreas (none) */
export const getMapAreasParamsSchema = z.object({});

/** GetMapAreas params type */
export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

// ============================================================================
// Output Schema & Types
// ============================================================================

/** Map area item schema */
export const mapAreaSchema = z.object({
  /** Map area code */
  MapArea: z.string(),
  /** Map area description */
  MapAreaDescription: z.string(),
});

/** Map areas array schema */
export const mapAreasArraySchema = z.array(mapAreaSchema);

/** MapArea type */
export type MapArea = z.infer<typeof mapAreaSchema>;

/** MapAreas type */
export type MapAreas = z.infer<typeof mapAreasArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for map areas; polls every 60s */
export const mapAreasOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getMapAreas"],
    queryFn: () => getMapAreas({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
