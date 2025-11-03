import { z } from "@/shared/zod-openapi-init";
import { roadwayLocationSchema, zDotnetDate } from "@/apis/shared";

/**
 * Schema for BorderCrossingData - represents border crossing wait time data
 *
 * Information about Canadian border crossing wait times.
 */
export const borderCrossingDataSchema = z
  .object({
    BorderCrossingLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location information for border crossing, as a roadway location object. E.g., I-5 General Purpose at latitude 49.004776, longitude -122.756964, null when location data is unavailable like SR539Nexus. Provides geographic and route information for crossing identification."
      ),
    CrossingName: z
      .string()
      .nullable()
      .describe(
        "Common name identifier for border crossing, as a crossing code. E.g., 'I5' for I-5 General Purpose, 'I5Nexus' for I-5 Nexus Lane, 'SR543TrucksFast' for SR-543 Trucks FAST Lane, 'SR9' for SR-9 General Purpose, null when crossing name is unavailable. Used for crossing identification and user display."
      ),
    Time: zDotnetDate().describe(
      "Timestamp when border crossing wait time reading was taken, as a UTC datetime. E.g., '2025-11-02T19:10:00.000Z' for reading at 7:10 PM on November 2, 2025. Indicates data freshness and when wait time measurement occurred."
    ),
    WaitTime: z
      .int()
      .describe(
        "Current border crossing wait time, as minutes. E.g., '15' for 15 minutes at I-5 General Purpose, '5' for 5 minutes at I-5 Nexus Lane, '10' for 10 minutes at SR-543 Trucks, '-1' when wait time is unavailable or not applicable. Negative values indicate wait time data is not available for that crossing."
      ),
  })
  .describe(
    "Represents border crossing wait time data including crossing identification, location information, current wait times, and measurement timestamp. E.g., I-5 General Purpose crossing (I5) at location 49.004776, -122.756964 with 15 minute wait time measured at 7:10 PM. Used for border crossing planning, route selection, and wait time monitoring. Updates approximately every minute."
  );

export type BorderCrossingData = z.infer<typeof borderCrossingDataSchema>;
