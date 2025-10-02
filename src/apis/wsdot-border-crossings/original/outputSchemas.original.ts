import { z } from "zod";
import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared/";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 */
export const borderCrossingDataSchema = z.object({
  /** Where the crossing is located. */
  BorderCrossingLocation: roadwayLocationSchema
    .nullable()
    .describe("Where the crossing is located."),
  /** Common name of the crossing. */
  CrossingName: z.string().nullable().describe("Common name of the crossing."),
  /** When the reading was taken. */
  Time: zWsdotDate().describe("When the reading was taken."),
  /** Current time to cross border. */
  WaitTime: z.int().describe("Current time to cross border."),
});

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

/**
 * Schema for BorderCrossingDataList - the main response list
 */
export const borderCrossingDataListSchema = z.array(borderCrossingDataSchema);

export type BorderCrossingDataList = z.infer<
  typeof borderCrossingDataListSchema
>;
