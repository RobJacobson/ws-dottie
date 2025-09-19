import { z } from "zod";

import { dispGISZoomLocSchema } from "./dispGISZoomLoc.zod";
import { terminalSchema } from "./terminal.zod";

/**
 * Terminal location schema for WSF Terminals API
 *
 * This operation retrieves detailed location information pertaining to terminals.
 * A TerminalID, or unique terminal identifier, may be optionally passed to retrieve
 * a specific terminal. A valid API Access Code from the WSDOT Traveler API must be
 * passed as part of the URL string.
 */
export const terminalLocationSchema = terminalSchema.extend({
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

  /** Where this terminal should appear on a GIS map (at various zoom levels). */
  DispGISZoomLoc: z
    .array(dispGISZoomLocSchema)
    .nullable()
    .describe(
      "Where this terminal should appear on a GIS map (at various zoom levels)."
    ),
});

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * Array of terminal locations.
 */
export const terminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe("Detailed location information pertaining to terminals.");

export type TerminalLocations = z.infer<typeof terminalLocationsSchema>;
