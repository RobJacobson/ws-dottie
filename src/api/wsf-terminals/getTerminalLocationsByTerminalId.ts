import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";

// ============================================================================
// API Function
//
// getTerminalLocationsByTerminalId
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminallocations/{terminalId}";

/**
 * API function for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalLocation object containing location information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const location = await getTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(location.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocationsByTerminalId = async (
  params: GetTerminalLocationsByTerminalIdParams
): Promise<TerminalLocation> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalLocationsByTerminalIdParamsSchema,
      output: terminalLocationSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalLocationsByTerminalIdParamsSchema
// GetTerminalLocationsByTerminalIdParams
// ============================================================================

export const getTerminalLocationsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving location information for a specific terminal by ID."
  );

export type GetTerminalLocationsByTerminalIdParams = z.infer<
  typeof getTerminalLocationsByTerminalIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalLocationSchema
// TerminalLocation
// ============================================================================

export const terminalLocationSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    AddressLineOne: z
      .string()
      .describe(
        "Primary address line for the terminal. Contains the street address and building information."
      ),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe(
        "Secondary address line for the terminal. Contains additional address information such as suite numbers or building details."
      ),
    City: z
      .string()
      .describe(
        "City where the terminal is located. Provides the municipality or city name for the terminal address."
      ),
    State: z
      .string()
      .describe(
        "State where the terminal is located. Provides the state or province name for the terminal address."
      ),
    ZipCode: z
      .string()
      .describe(
        "ZIP or postal code for the terminal address. Used for mail delivery and geographic identification."
      ),
    Country: z
      .string()
      .describe(
        "Country where the terminal is located. Provides the country name for the terminal address."
      ),
    Latitude: z
      .number()
      .describe(
        "Geographic latitude coordinate of the terminal. Used for mapping and location services."
      ),
    Longitude: z
      .number()
      .describe(
        "Geographic longitude coordinate of the terminal. Used for mapping and location services."
      ),
    Directions: z
      .string()
      .nullable()
      .describe(
        "Text directions to the terminal. Provides step-by-step instructions for reaching the terminal by various transportation methods."
      ),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z
              .number()
              .describe(
                "Latitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            Longitude: z
              .number()
              .describe(
                "Longitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            ZoomLevel: z
              .number()
              .int()
              .min(0)
              .describe(
                "Recommended zoom level for displaying this location on a map. Ensures optimal visibility of the terminal."
              ),
          })
          .describe(
            "GIS display location with recommended zoom level. Used for mapping applications to show terminal locations optimally."
          )
      )
      .describe(
        "Array of GIS display locations for the terminal. Contains coordinates and zoom levels for optimal map display."
      ),
    MapLink: z
      .string()
      .nullable()
      .describe(
        "URL link to an online map showing the terminal location. Provides direct access to mapping services for the terminal."
      ),
  })
  .describe(
    "Complete location information for a terminal including address, coordinates, directions, and mapping resources. Used for navigation and location services."
  );

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalLocationsByTerminalId
// ============================================================================

/**
 * React Query hook for fetching terminal locations by terminal ID
 *
 * Retrieves terminal locations for a specific terminal from the WSF Terminals API.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param options - Optional React Query options
 * @returns Query result containing TerminalLocation object
 */
export const useTerminalLocationsByTerminalId = (
  params: GetTerminalLocationsByTerminalIdParams,
  options?: TanStackOptions<TerminalLocation>
): UseQueryResult<TerminalLocation, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "locations", params.terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
