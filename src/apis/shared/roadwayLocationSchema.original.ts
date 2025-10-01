import { z } from "zod";

/**
 * Schema for RoadwayLocation - represents location information for a roadway
 */
export const roadwayLocationSchema = z.object({
  Description: z
    .string()
    .nullable()
    .describe(
      "Human-readable description of the roadway location, as a string. E.g., 'I-5 interchange' for major highway junctions, 'Bellevue Way SE' for cross streets. Provides context for precise location identification when milepost alone is insufficient."
    ),
  Direction: z
    .string()
    .nullable()
    .describe(
      "Traffic direction designation for the roadway location, as a string. E.g., 'N' for northbound, 'S' for southbound, 'B' for both directions. Indicates which side of the highway the alert affects, regardless of actual compass orientation."
    ),
  Latitude: z
    .number()
    .describe(
      "Latitude coordinate for the roadway location, in decimal degrees. E.g., '47.6062' for Seattle area, '48.7519' for Bellingham region. Enables precise geographic mapping and distance calculations for navigation systems."
    ),
  Longitude: z
    .number()
    .describe(
      "Longitude coordinate for the roadway location, in decimal degrees. E.g., '-122.3321' for Seattle area, '-122.4785' for Bellingham region. Enables precise geographic mapping and distance calculations for navigation systems."
    ),
  MilePost: z
    .number()
    .describe(
      "Milepost marker for the roadway location, as a number. E.g., '12.5' for milepost 12.5, '0' for route terminus. Provides precise location reference along highway corridors for accurate incident reporting and navigation."
    ),
  RoadName: z
    .string()
    .nullable()
    .describe(
      "Highway or route designation for the roadway location, as a string. E.g., '005' for I-5, '090' for I-90, '520' for SR-520. Identifies the specific highway corridor where the alert is located."
    ),
});

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
