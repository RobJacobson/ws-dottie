import { z } from "@/shared/zod-openapi-init";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for toll trip version information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripVersionSchema = z
  .object({
    TimeStamp: zDotnetDate().describe(
      "Timestamp when version was created or last updated, as a UTC datetime. E.g., '2025-11-02T19:29:33.000Z' for version timestamp at 7:29 PM on November 2, 2025. Indicates when version was established."
    ),
    Version: z
      .int()
      .describe(
        "Version number for toll trip rates data, as an integer. E.g., '371529' for version 371529. Increments when trip rates data is updated. Used for data versioning and change tracking."
      ),
  })
  .describe(
    "Represents version information for toll trip rates data including version number and timestamp. E.g., version 371529 with timestamp 7:29 PM on November 2, 2025. Used for checking data freshness, version tracking, and determining when to refresh trip rates data."
  );

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;
