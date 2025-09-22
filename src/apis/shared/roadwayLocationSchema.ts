import { z } from "zod";

/**
 * Schema for RoadwayLocation - represents location information for a roadway
 */
export const roadwayLocationSchema = z.object({
  Description: z
    .string()
    .nullable()
    .describe(
      "A description of the location. This could be a cross street or a nearby landmark."
    ),
  Direction: z
    .string()
    .nullable()
    .describe(
      "The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction."
    ),
  Latitude: z.number().describe("Latitude of the location."),
  Longitude: z.number().describe("Longitude of the location."),
  MilePost: z.number().describe("The milepost of the location."),
  RoadName: z.string().nullable().describe("The name of the road."),
});

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
