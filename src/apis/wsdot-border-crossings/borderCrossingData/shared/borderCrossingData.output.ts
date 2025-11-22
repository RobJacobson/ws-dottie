import { roadwayLocationSchema } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for border crossing wait time data.
 *
 * Each record describes the latest wait time for a Washington border
 * crossing into Canada.
 */
export const borderCrossingSchema = z
  .object({
    BorderCrossingLocation: roadwayLocationSchema
      .nullable()
      .describe(
        "Roadway location of the border crossing, including route, milepost, and coordinates, or null when location data is not provided for this lane."
      ),
    CrossingName: z
      .string()
      .nullable()
      .describe(
        "Display code for the border crossing or lane (for example I5, I5Nexus, SR543TrucksFast), or null when unavailable."
      ),
    Time: z
      .date()
      .describe(
        "UTC datetime when this border crossing wait time observation was recorded."
      ),
    WaitTime: z
      .number()
      .int()
      .describe(
        "Current estimated wait time for this crossing in minutes; -1 when a wait time is not available."
      ),
  })
  .describe(
    "Border crossing wait-time record for a Washington crossing into Canada, including location, crossing code, observation time, and wait time in minutes."
  );

export type BorderCrossing = z.infer<typeof borderCrossingSchema>;
