import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { RoadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 */
export const BorderCrossingDataSchema = z.object({
  BorderCrossingLocation: RoadwayLocationSchema.nullable().describe(
    "Where the crossing is located."
  ),
  CrossingName: z.string().nullable().describe("Common name of the crossing."),
  Time: zWsdotDate().describe("When the reading was taken."),
  WaitTime: z.number().describe("Current time to cross border."),
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
