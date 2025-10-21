/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * DispGISZoomLoc schema
 *
 * Contains GIS zoom level location information.
 */
export const dispGISZoomLocSchema = z.object({
  /** The GIS zoom level. */
  ZoomLevel: z.number().int().describe("The GIS zoom level."),
  /** The terminal's latitude for this GIS zoom level. */
  Latitude: z
    .number()
    .nullable()
    .describe("The terminal's latitude for this GIS zoom level."),
  /** The terminal's longitude for this GIS zoom level. */
  Longitude: z
    .number()
    .nullable()
    .describe("The terminal's longitude for this GIS zoom level."),
});

export type DispGISZoomLoc = z.infer<typeof dispGISZoomLocSchema>;

/**
 * TerminalLocation schema
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationSchema = terminalBaseSchema.extend({
  /** The latitude of the terminal. */
  Latitude: z.number().nullable().describe("The latitude of the terminal."),
  /** The longitude of the terminal. */
  Longitude: z.number().nullable().describe("The longitude of the terminal."),
  /** The first line of the terminal's address. */
  AddressLineOne: z
    .string()
    .nullable()
    .describe("The first line of the terminal's address."),
  /** The second line of the terminal's address. */
  AddressLineTwo: z
    .string()
    .nullable()
    .describe("The second line of the terminal's address."),
  /** The city where the terminal is located. */
  City: z
    .string()
    .nullable()
    .describe("The city where the terminal is located."),
  /** The state where the terminal is located. */
  State: z
    .string()
    .nullable()
    .describe("The state where the terminal is located."),
  /** The terminal's zip code. */
  ZipCode: z.string().nullable().describe("The terminal's zip code."),
  /** The country where the terminal is located. */
  Country: z
    .string()
    .nullable()
    .describe("The country where the terminal is located."),
  /** A URL to a page that displays the terminal on a GIS map. */
  MapLink: z
    .string()
    .nullable()
    .describe("A URL to a page that displays the terminal on a GIS map."),
  /** Instructions detailing how to drive to the terminal. */
  Directions: z
    .string()
    .nullable()
    .describe("Instructions detailing how to drive to the terminal."),
  /**
   * Where this terminal should appear on a GIS map (at various zoom levels).
   */
  DispGISZoomLoc: z
    .array(dispGISZoomLocSchema)
    .nullable()
    .describe(
      "Where this terminal should appear on a GIS map (at various zoom levels)."
    ),
});

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * GetAllTerminalLocations schema
 *
 * Returns all terminal locations.
 */
export const getAllTerminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe(
    "This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
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
