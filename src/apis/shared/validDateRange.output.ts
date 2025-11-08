import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Shared Valid Date Range schema used by multiple WSF APIs.
 */
export const validDateRangeSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "Start date when data becomes available, as a UTC datetime. E.g., '2025-11-02T07:00:00.000Z'. Indicates earliest trip date for which data is published."
    ),
    DateThru: zDotnetDate().describe(
      "End date when data stops being available, as a UTC datetime. E.g., '2026-03-21T07:00:00.000Z'. Indicates latest trip date for which data is published."
    ),
  })
  .describe(
    "Represents date range for which fares data is currently published and available, including start and end dates. E.g., fares available from November 2, 2025 through March 21, 2026. Use to determine valid trip dates for fare queries before calling other endpoints."
  );

// Schedule variant description retained for reference:
// .describe(
//   "Represents date range for which schedule data is currently published and available, including start and end dates. E.g., schedules available from November 2, 2025 through March 21, 2026. Use to determine valid trip dates for schedule queries before calling other endpoints."
// );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
