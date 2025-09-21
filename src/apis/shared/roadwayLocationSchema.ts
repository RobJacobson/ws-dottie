import { z } from "zod";

/**
 * Schema for RoadwayLocation - represents location information for a roadway in WSDOT Commercial Vehicle Restrictions
 */
export const RoadwayLocationSchema = z.object({
  Description: z.string().nullable().describe("Description of the location."),
  Direction: z.string().nullable().describe("Direction of the roadway."),
  Latitude: z.number().describe("Latitude coordinate of the location."),
  Longitude: z.number().describe("Longitude coordinate of the location."),
  MilePost: z.number().describe("Mile post marker along the roadway."),
  RoadName: z.string().nullable().describe("Name of the roadway."),
});

export type RoadwayLocation = z.infer<typeof RoadwayLocationSchema>;
