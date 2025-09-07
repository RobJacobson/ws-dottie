import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Schema for validating the response from the GET /validdaterange endpoint.
 *
 * This operation retrieves a date range for which fares data is currently
 * published & available. A valid API Access Code from the WSDOT Traveler API
 * must be passed as part of the URL string.
 */
export const validDateRangeSchema = z.object({
  /** Fares information is available from this date onward. */
  DateFrom: zWsdotDate().describe(
    "Fares information is available from this date onward."
  ),
  /** Fares information is not available after this date. */
  DateThru: zWsdotDate().describe(
    "Fares information is not available after this date."
  ),
});

export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
