import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminallocations";

/**
 * API function for fetching terminal locations from WSF Terminals API
 *
 * Retrieves location information for all terminals including coordinates,
 * addresses, and geographic data. This endpoint provides the physical
 * location details for all WSF terminals.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalLocation objects containing terminal location information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const locations = await getTerminalLocations({});
 * console.log(locations[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocations = async (
  params: GetTerminalLocationsParams = {}
): Promise<TerminalLocation[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalLocationsParamsSchema,
      output: terminalLocationArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalLocationsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal locations.");

export type GetTerminalLocationsParams = z.infer<
  typeof getTerminalLocationsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
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

export const terminalLocationArraySchema = z.array(terminalLocationSchema);

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching all terminal locations
 *
 * Retrieves detailed location information for all terminals including
 * addresses, coordinates, and geographic data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalLocation objects
 */
export const useTerminalLocations = (
  options?: TanStackOptions<TerminalLocation[]>
): UseQueryResult<TerminalLocation[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: () => getTerminalLocations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
