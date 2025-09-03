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

export type MapAreas = z.infer<typeof mapAreasArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useMapAreas
// ============================================================================

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
