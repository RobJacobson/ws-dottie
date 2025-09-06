import { z } from "zod";

/**
 * Display GIS zoom location schema for WSF Terminals API
 *
 * Represents where this terminal should appear on a GIS map at various zoom levels.
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
