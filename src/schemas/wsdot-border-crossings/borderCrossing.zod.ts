import { z } from "zod";

import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * BorderCrossing schema
 *
 * Information about Canadian border crossing wait times.
 */
export const borderCrossingSchema = z
  .object({
    /** Where the crossing is located */
    BorderCrossingLocation: roadwayLocationSchema
      .nullable()
      .describe("Where the crossing is located"),
    /** Border crossing name (e.g., 'I5', 'SR 543') or null when not available */
    CrossingName: z
      .string()
      .nullable()
      .describe(
        "Border crossing name (e.g., 'I5', 'SR 543') or null when not available"
      ),
    /** Report time (JS Date) */
    Time: zWsdotDate().describe("Report time (JS Date)"),
    /** Estimated wait time in minutes (can be negative to indicate no wait or special conditions) */
    WaitTime: z
      .number()
      .int()
      .describe(
        "Estimated wait time in minutes (can be negative to indicate no wait or special conditions)"
      ),
  })
  .describe("Information about Canadian border crossing wait times.");

/** BorderCrossing type */
export type BorderCrossing = z.infer<typeof borderCrossingSchema>;

/**
 * Array of border crossings.
 */
export const borderCrossingsSchema = z
  .array(borderCrossingSchema)
  .describe(
    "Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada."
  );

export type BorderCrossings = z.infer<typeof borderCrossingsSchema>;
