/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../../shared/terminalBaseSchema";

/**
 * DispGISZoomLoc schema
 *
 * Contains GIS zoom level location information.
 */
export const dispGISZoomLocSchema = z
  .object({
    ZoomLevel: z.number().int().describe("GIS zoom level for map display."),
    Latitude: z
      .number()
      .nullable()
      .describe("Latitude coordinate for this zoom level in decimal degrees."),
    Longitude: z
      .number()
      .nullable()
      .describe("Longitude coordinate for this zoom level in decimal degrees."),
  })
  .describe(
    "GIS zoom level location information including zoom level and coordinates."
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
      .describe("Latitude of the terminal in decimal degrees."),
    Longitude: z
      .number()
      .nullable()
      .describe("Longitude of the terminal in decimal degrees."),
    AddressLineOne: z
      .string()
      .nullable()
      .describe("First line of the terminal street address."),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe("Second line of the terminal street address."),
    City: z.string().nullable().describe("City where the terminal is located."),
    State: z
      .string()
      .nullable()
      .describe("State code where the terminal is located."),
    ZipCode: z
      .string()
      .nullable()
      .describe("Postal zip code for the terminal location."),
    Country: z
      .string()
      .nullable()
      .describe("Country code where the terminal is located."),
    MapLink: z
      .string()
      .nullable()
      .describe("URL to a map displaying the terminal location."),
    Directions: z
      .string()
      .nullable()
      .describe("HTML-formatted driving directions to the terminal."),
    DispGISZoomLoc: z
      .array(dispGISZoomLocSchema)
      .nullable()
      .describe("Array of GIS zoom level locations for the terminal."),
  })
  .describe(
    "Detailed terminal location information including coordinates, address, map link, driving directions, and GIS zoom level locations."
  );

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * GetAllTerminalLocations schema
 *
 * Returns all terminal locations.
 */
export const getAllTerminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe("Array of location information for all terminals.");

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
