import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getMapAreas
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson";

export const getMapAreas = async (
  params: GetMapAreasParams = {}
): Promise<MapArea[]> => {
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

export const getMapAreasParamsSchema = z.object({}).describe("");

export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// mapAreaSchema
// MapArea
// ============================================================================

export const mapAreaSchema = z
  .object({
    MapArea: z.string().describe(""),

    MapAreaDescription: z.string().describe(""),
  })
  
  .describe("");

export const mapAreasArraySchema = z.array(mapAreaSchema).describe("");

export type MapArea = z.infer<typeof mapAreaSchema>;

// ============================================================================
// TanStack Query Hook
//
// useMapAreas
// ============================================================================

export const useMapAreas = (
  params: GetMapAreasParams = {},
  options?: UseQueryOptions<MapArea[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getMapAreas",
      JSON.stringify(params),
    ],
    queryFn: () => getMapAreas(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
