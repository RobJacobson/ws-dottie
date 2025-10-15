import { z } from "zod";

/**
 * Schema for Area - represents a map area
 *
 * Return list of areas and associated IDs
 */
export const areaSchema = z.object({
  /** The map area identifier. */
  MapArea: z.string().nullable().describe("The map area identifier."),
  /** Description of the map area. */
  MapAreaDescription: z
    .string()
    .nullable()
    .describe("Description of the map area."),
});

export type Area = z.infer<typeof areaSchema>;
