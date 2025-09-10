import { z } from "zod";

/**
 * MapArea schema
 *
 * List of map areas available for traffic alert queries.
 */
export const mapAreaSchema = z
  .object({
    /** Name of area on map. */
    MapArea: z.string().nullable().describe("Name of area on map."),
    /** Description of area. */
    MapAreaDescription: z.string().nullable().describe("Description of area."),
  })
  .describe("List of map areas available for traffic alert queries.");

/**
 * MapAreas schema
 *
 * Array of map areas used for filtering highway alerts.
 */
export const mapAreasSchema = z
  .array(mapAreaSchema)
  .describe("Array of map areas used for filtering highway alerts.");

/** MapArea type */
export type MapArea = z.infer<typeof mapAreaSchema>;

/** MapAreas type */
export type MapAreas = z.infer<typeof mapAreasSchema>;
