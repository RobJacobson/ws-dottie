import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";

/**
 * Schema for WSF Schedule API valid date range response.
 * This operation retrieves a date range for which schedule data is currently published & available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const validDateRangeSchema = z.object({
  /** Schedule information is available from this trip date onward. */
  DateFrom: zWsdotDate().describe(
    "Schedule information is available from this trip date onward."
  ),
  /** Schedule information is not available after this trip date. */
  DateThru: zWsdotDate().describe(
    "Schedule information is not available after this trip date."
  ),
});

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
