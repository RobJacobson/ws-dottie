import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { RoadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 */
export const BorderCrossingDataSchema = z.object({
  BorderCrossingLocation: RoadwayLocationSchema.nullable().describe(
    "Location information for the border crossing."
  ),
  CrossingName: z.string().nullable().describe("Name of the border crossing."),
  Time: zWsdotDate().describe("Time when the wait time data was recorded."),
  WaitTime: z.number().describe("Estimated wait time in minutes."),
});

export type BorderCrossingData = z.infer<typeof BorderCrossingDataSchema>;

/**
 * Schema for ArrayOfBorderCrossingData - the main response array
 */
export const ArrayOfBorderCrossingDataSchema = z.array(
  BorderCrossingDataSchema
);

export type ArrayOfBorderCrossingData = z.infer<
  typeof ArrayOfBorderCrossingDataSchema
>;
