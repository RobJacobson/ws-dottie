import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getMapAreas
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson";

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
//
// getMapAreasParamsSchema
// GetMapAreasParams
// ============================================================================

export const getMapAreasParamsSchema = z.object({});

export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// mapAreaSchema
// MapArea
// ============================================================================

export const mapAreaSchema = z.object({
  MapArea: z.string(),

  MapAreaDescription: z.string(),
});

export const mapAreasArraySchema = z.array(mapAreaSchema);

export type MapArea = z.infer<typeof mapAreaSchema>;

/**
 * MapAreas type - represents an array of map area objects
 */
export type MapAreas = z.infer<typeof mapAreasArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useMapAreas
// ============================================================================

export const useMapAreas = createUseQueryWsdot({
  queryFn: getMapAreas,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getMapAreas"],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});
