import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

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
