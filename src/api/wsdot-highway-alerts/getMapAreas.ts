import type { UseQueryResult } from "@tanstack/react-query";
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

/**
 * Get map areas from WSDOT Highway Alerts API
 *
 * Returns a list of available map areas that can be used to filter highway alerts.
 * This endpoint provides geographic regions for targeted alert retrieval.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing array of map area objects
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const mapAreas = await getMapAreas({});
 * console.log(mapAreas[0].MapArea); // "Seattle"
 * console.log(mapAreas[0].MapAreaDescription); // "Seattle metropolitan area"
 * ```
 */
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

export const getMapAreasParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting map areas. The API returns all available map areas that can be used to filter highway alerts by geographic region."
  );

export type GetMapAreasParams = z.infer<typeof getMapAreasParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// mapAreaSchema
// MapArea
// ============================================================================

export const mapAreaSchema = z
  .object({
    MapArea: z
      .string()
      .describe(
        "The map area identifier used for filtering highway alerts. This is the value that should be passed to the getHighwayAlertsByMapArea endpoint to retrieve alerts for this specific geographic region."
      ),

    MapAreaDescription: z
      .string()
      .describe(
        "Human-readable description of the map area providing context about the geographic region covered. Examples include 'Seattle metropolitan area', 'Eastern Washington', 'Puget Sound region', or 'Olympic Peninsula'."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Map area information including the area identifier and descriptive text. Used to understand available geographic regions for filtering highway alerts and to provide user-friendly descriptions for map area selection."
  );

export const mapAreasArraySchema = z
  .array(mapAreaSchema)
  .describe(
    "Array of available map areas that can be used to filter highway alerts by geographic region. Each map area includes an identifier and description to help users select appropriate regions for targeted alert retrieval."
  );

export type MapArea = z.infer<typeof mapAreaSchema>;

// ============================================================================
// TanStack Query Hook
//
// useMapAreas
// ============================================================================

/**
 * Hook for getting map areas from WSDOT Highway Alerts API
 *
 * Returns a list of available map areas that can be used to filter highway alerts.
 * This endpoint provides geographic regions for targeted alert retrieval.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with array of map area objects
 */
export const useMapAreas = (
  params: GetMapAreasParams = {},
  options?: TanStackOptions<MapArea[]>
): UseQueryResult<MapArea[], Error> => {
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
