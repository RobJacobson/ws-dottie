import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { roadwayLocationSchema } from "../shared/roadwayLocationSchema";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 */
export const borderCrossingDataSchema = z.object({
  BorderCrossingLocation: roadwayLocationSchema
    .nullable()
    .describe("Where the crossing is located."),
  CrossingName: z.string().nullable().describe("Common name of the crossing."),
  Time: zWsdotDate().describe("When the reading was taken."),
  WaitTime: z.number().describe("Current time to cross border."),
});

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/**
 * Schema for BorderCrossingDataList - the main response list
 */
export const borderCrossingDataListSchema = z.array(borderCrossingDataSchema);

export type BorderCrossingDataList = z.infer<
  typeof borderCrossingDataListSchema
>;
