import { z } from "@/shared/zod";

/**
 * Roadway location information including route, milepost, coordinates, and direction.
 */
export const roadwayLocationSchema = z
  .object({
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the roadway location, such as interchange names or cross streets."
      ),
    Direction: z
      .string()
      .nullable()
      .describe(
        "Traffic direction designation: N, S, B, NB, or SB, indicating which side of the highway is affected."
      ),
    Latitude: z
      .number()
      .describe("Latitude of the roadway location in decimal degrees."),
    Longitude: z
      .number()
      .describe("Longitude of the roadway location in decimal degrees."),
    MilePost: z
      .number()
      .describe(
        "Milepost marker along the highway corridor, with 0 indicating route terminus."
      ),
    RoadName: z
      .string()
      .nullable()
      .describe(
        "Highway or route designation code, such as '005' for I-5 or '090' for I-90."
      ),
  })
  .describe(
    "Roadway location information including route, milepost, coordinates, and direction."
  );

export type RoadwayLocation = z.infer<typeof roadwayLocationSchema>;
