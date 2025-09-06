import { z } from "zod";
import { zLatitude, zLongitude } from "@/shared/fetching/validation";

/**
 * RoadwayLocation schema
 *
 * Describes a specific location on a WA State Highway.
 */
export const roadwayLocationSchema = z
  .object({
    /** A description of the location. This could be a cross street or a nearby landmark. */
    Description: z
      .string()
      .describe(
        "A description of the location. This could be a cross street or a nearby landmark."
      ),
    /** The name of the road. */
    RoadName: z.string().describe("The name of the road."),
    /** The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction. */
    Direction: z
      .string()
      .describe(
        "The side of the road the location is on (Northbound, Southbound). This does not necessarily correspond to an actual compass direction."
      ),
    /** The milepost of the location. */
    MilePost: z.number().describe("The milepost of the location."),
    /** Latitude of the location. */
    Latitude: zLatitude().describe("Latitude of the location."),
    /** Longitude of the location. */
    Longitude: zLongitude().describe("Longitude of the location."),
  })
  .describe("Describes a specific location on a WA State Highway.");

/** RoadwayLocation type */
export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
