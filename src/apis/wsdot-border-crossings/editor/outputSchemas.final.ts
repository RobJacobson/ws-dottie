import { z } from "zod";
import { roadwayLocationSchema, zWsdotDate } from "@/apis/shared/";

export const borderCrossingDataSchema = z
  .object({
    BorderCrossingLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Geographic and roadway location details for the border crossing point, as a roadway location object. Includes highway designation, milepost (typically 0 at the border), and coordinates along the 49th parallel. E.g., I-5 General Purpose at latitude 49.004776. Returns null when location data is not available for the specific lane type, typically when the lane shares the same physical location as the corresponding general purpose lane."
      ),
    CrossingName: z
      .string()
      .nullable()
      .describe(
        "Unique identifier name for the specific border crossing lane, as a string. Combines highway designation with lane type to distinguish between different crossing options at the same location. E.g., 'I5' for I-5 General Purpose lanes, 'I5Nexus' for I-5 NEXUS trusted traveler lanes, 'SR543Trucks' for SR-543 commercial truck lanes, 'SR543TrucksFast' for SR-543 FAST expedited commercial lanes. Critical for selecting the appropriate crossing based on traveler eligibility and vehicle type."
      ),
    Time: zWsdotDate().describe(
      "Timestamp when the border crossing wait time data was last updated, as a UTC datetime string in ISO 8601 format. E.g., '2025-09-30T03:15:00.000Z' for 3:15 AM UTC (8:15 PM Pacific). All crossings typically share the same timestamp, indicating synchronized batch updates from border services. Critical for assessing data freshness, especially during rapidly changing traffic conditions."
    ),
    WaitTime: z
      .number()
      .describe(
        "Current wait time to cross the border from entering the inspection queue to clearing customs, in minutes. Essential for international travel planning and route optimization. E.g., '5' for minimal wait during off-peak hours, '10' for moderate traffic, '45' during peak periods and holidays. Returns '-1' when the lane is closed or wait time data is unavailable, which commonly occurs with NEXUS lanes during off-hours or when lanes are temporarily closed."
      ),
  })
  .describe(
    "Represents wait time data for a specific border crossing lane at a US-Canada border point in Washington State. Distinguishes between general purpose lanes, NEXUS trusted traveler lanes, commercial truck lanes, and FAST expedited commercial lanes at each crossing location."
  );

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;

export const borderCrossingDataListSchema = z
  .array(borderCrossingDataSchema)
  .describe(
    "Returns array of current wait times for US-Canada border crossings in Washington State, including all lane types across I-5, SR-543, SR-539, and SR-9 crossing points (typically returns 11 crossing lane combinations). Essential for international travel planning, commercial freight routing, and cross-border commuter optimization. Enables travelers to compare wait times across different crossings and select the most efficient option based on their NEXUS/FAST eligibility. Data is real-time."
  );

export type BorderCrossingDataList = z.infer<
  typeof borderCrossingDataListSchema
>;
