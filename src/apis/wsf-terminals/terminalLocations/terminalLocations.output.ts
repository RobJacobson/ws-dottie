/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod-openapi-init";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * DispGISZoomLoc schema
 *
 * Contains GIS zoom level location information.
 */
export const dispGISZoomLocSchema = z
  .object({
    ZoomLevel: z
      .number()
      .int()
      .describe(
        "GIS zoom level for map display, as an integer zoom level. E.g., '0' for world view, '10' for city view, '17' for street view. Used to determine appropriate map zoom level for terminal display."
      ),
    Latitude: z
      .number()
      .nullable()
      .describe(
        "Terminal latitude coordinate for this zoom level, as a decimal degrees. E.g., 48.507351 for Anacortes terminal, 47.622339 for Bainbridge Island terminal, null when coordinate is unavailable. Used for GIS map positioning at specific zoom levels."
      ),
    Longitude: z
      .number()
      .nullable()
      .describe(
        "Terminal longitude coordinate for this zoom level, as a decimal degrees. E.g., -122.677 for Anacortes terminal, -122.509617 for Bainbridge Island terminal, null when coordinate is unavailable. Used for GIS map positioning at specific zoom levels."
      ),
  })
  .describe(
    "Represents GIS zoom level location information including zoom level and coordinates. E.g., zoom level 17 with coordinates (48.507351, -122.677) for Anacortes terminal. Used for dynamic map positioning at different zoom levels."
  );

export type DispGISZoomLoc = z.infer<typeof dispGISZoomLocSchema>;

/**
 * TerminalLocation schema
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationSchema = terminalBaseSchema
  .extend({
    Latitude: z
      .number()
      .nullable()
      .describe(
        "Terminal latitude coordinate, as a decimal degrees. E.g., 48.507351 for Anacortes terminal, 47.622339 for Bainbridge Island terminal, null when coordinate is unavailable. Used for terminal location mapping and GPS navigation."
      ),
    Longitude: z
      .number()
      .nullable()
      .describe(
        "Terminal longitude coordinate, as a decimal degrees. E.g., -122.677 for Anacortes terminal, -122.509617 for Bainbridge Island terminal, null when coordinate is unavailable. Used for terminal location mapping and GPS navigation."
      ),
    AddressLineOne: z
      .string()
      .nullable()
      .describe(
        "First line of terminal street address, as an address line. E.g., '2100 Ferry Terminal Road' for Anacortes terminal, '270 Olympic Drive SE' for Bainbridge Island terminal, null when address is unavailable. Used for address display and navigation."
      ),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe(
        "Second line of terminal street address, as an address line. E.g., null when no second address line, suite or building information when available. Used for complete address display."
      ),
    City: z
      .string()
      .nullable()
      .describe(
        "City where terminal is located, as a city name. E.g., 'Anacortes' for Anacortes terminal, 'Bainbridge Island' for Bainbridge Island terminal, null when city is unavailable. Used for address display and location identification."
      ),
    State: z
      .string()
      .nullable()
      .describe(
        "State where terminal is located, as a state code. E.g., 'WA' for Washington state terminals, null when state is unavailable. Used for address display and location identification."
      ),
    ZipCode: z
      .string()
      .nullable()
      .describe(
        "Terminal postal zip code, as a zip code string. E.g., '98221' for Anacortes terminal, '98110' for Bainbridge Island terminal, null when zip code is unavailable. Used for address display and location identification."
      ),
    Country: z
      .string()
      .nullable()
      .describe(
        "Country where terminal is located, as a country code. E.g., 'USA' for United States terminals, null when country is unavailable. Used for address display and location identification."
      ),
    MapLink: z
      .string()
      .nullable()
      .describe(
        "URL to page displaying terminal on GIS map, as a map URL. E.g., 'https://www.google.com/maps/place/Anacortes+Ferry+Terminal...' for Google Maps link, null when map link is unavailable. Used for terminal location mapping and navigation."
      ),
    Directions: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted driving directions to terminal, as driving directions. E.g., 'From Interstate 5 take exit 230...' for Anacortes directions, null when directions are unavailable. HTML-formatted text for navigation instructions."
      ),
    DispGISZoomLoc: z
      .array(dispGISZoomLocSchema)
      .nullable()
      .describe(
        "Array of GIS zoom level locations for terminal, as zoom level location objects. E.g., array containing coordinates for zoom levels 0-17, null when zoom level locations are unavailable. Used for dynamic map positioning at different zoom levels."
      ),
  })
  .describe(
    "Represents detailed terminal location information including terminal identification, coordinates, address, map link, driving directions, and GIS zoom level locations. E.g., Anacortes terminal (ID 1) at 2100 Ferry Terminal Road, Anacortes, WA 98221 with coordinates (48.507351, -122.677). Used for terminal location mapping, navigation, and GIS display."
  );

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * GetAllTerminalLocations schema
 *
 * Returns all terminal locations.
 */
export const getAllTerminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe(
    "Array of detailed terminal location information including terminal IDs, addresses, coordinates, map links, and driving directions. E.g., array containing all terminals with their location details. Used for terminal location mapping and navigation."
  );

export type GetAllTerminalLocations = z.infer<
  typeof getAllTerminalLocationsSchema
>;

/**
 * GetSpecificTerminalLocation schema
 *
 * Returns location information for a specific terminal.
 */
export const getSpecificTerminalLocationSchema = terminalLocationSchema;

export type GetSpecificTerminalLocation = z.infer<
  typeof getSpecificTerminalLocationSchema
>;
