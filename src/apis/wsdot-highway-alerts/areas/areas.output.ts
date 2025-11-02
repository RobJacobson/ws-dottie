import { z } from "zod";

/**
 * Schema for Area - represents a map area
 *
 * Return list of areas and associated IDs
 */
export const areaSchema = z
  .object({
    MapArea: z
      .string()
      .nullable()
      .describe(
        "Unique map area identifier code, as an area code. E.g., 'L2CE' for Central area, 'L2CL' for Central area variant, 'L2LO' for Western area, 'L2NE' for Northeast area, 'L2NN' for Northwest area, null when area code is unavailable. Used for filtering alerts by geographic map area."
      ),
    MapAreaDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of map area, as an area name. E.g., 'Eastern' for Eastern Washington area, 'Central' for Central Washington area, 'Western' for Western Washington area, 'Northeast' for Northeast area, 'Northwest' for Northwest area, null when description is unavailable. Provides geographic identification for map area."
      ),
  })
  .describe(
    "Represents map area information including area identifier code and geographic description. E.g., area 'L2CE' (Central) or 'L2NN' (Northwest). Used for geographic alert filtering and map area identification. Provides reference data for area-based alert queries."
  );

export type Area = z.infer<typeof areaSchema>;
