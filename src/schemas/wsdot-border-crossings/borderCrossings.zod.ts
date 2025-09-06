import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/fetching/validation";

/**
 * BorderCrossing schema
 *
 * Information about Canadian border crossing wait times.
 */
export const borderCrossingSchema = z
  .object({
    /** Report time (JS Date) */
    Time: zWsdotDate().describe("Report time (JS Date)"),
    /** Border crossing name (e.g., 'I5', 'SR 543') or null when not available */
    CrossingName: z
      .string()
      .describe(
        "Border crossing name (e.g., 'I5', 'SR 543') or null when not available"
      ),
    /** Where the crossing is located */
    BorderCrossingLocation: roadwayLocationSchema.describe(
      "Where the crossing is located"
    ),
    /** Estimated wait time in minutes */
    WaitTime: z
      .number()
      .int()
      .positive()
      .describe("Estimated wait time in minutes"),
  })
  .describe("Information about Canadian border crossing wait times.");

/**
 * BorderCrossings schema
 *
 * Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada.
 */
export const borderCrossingsSchema = z
  .array(borderCrossingSchema)
  .describe(
    "Coverage Area: I-5, SR-543, SR-539, and SR-9 crossings. Provides current wait times for the various border crossings into Canada."
  );

/** BorderCrossing type */
export type BorderCrossing = z.infer<typeof borderCrossingSchema>;

/** BorderCrossings type */
export type BorderCrossings = z.infer<typeof borderCrossingsSchema>;
