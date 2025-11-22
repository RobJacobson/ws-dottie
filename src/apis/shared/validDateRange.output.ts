import { z } from "@/shared/zod";

/**
 * Shared Valid Date Range schema used by multiple WSF APIs.
 */
export const validDateRangeSchema = z
  .object({
    DateFrom: z
      .date()
      .describe(
        "UTC datetime when data becomes available (earliest valid trip date)."
      ),
    DateThru: z
      .date()
      .describe(
        "UTC datetime when data stops being available (latest valid trip date)."
      ),
  })
  .describe(
    "Date range for which fares data is currently published and available."
  );

// Schedule variant description retained for reference:
// .describe(
//   "Represents date range for which schedule data is currently published and available, including start and end dates. E.g., schedules available from November 2, 2025 through March 21, 2026. Use to determine valid trip dates for schedule queries before calling other endpoints."
// );

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
