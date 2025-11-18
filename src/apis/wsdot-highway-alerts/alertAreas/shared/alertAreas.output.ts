import { z } from "@/shared/zod";

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
        "Map area identifier code for geographic filtering, or null when unavailable."
      ),
    MapAreaDescription: z
      .string()
      .nullable()
      .describe("Display name of the map area, or null when unavailable."),
  })
  .describe(
    "Geographic map area with identifier code and display name for filtering highway alerts by region."
  );

export type Area = z.infer<typeof areaSchema>;
