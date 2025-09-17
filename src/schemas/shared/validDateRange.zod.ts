import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Shared schema for WSDOT API valid date range responses.
 *
 * This schema is used by both WSF Fares and WSF Schedule APIs to represent
 * the date range for which data is currently published and available.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const validDateRangeSchema = z.object({
  /** Information is available from this date onward. */
  DateFrom: zWsdotDate().describe(
    "Information is available from this date onward."
  ),
  /** Information is not available after this date. */
  DateThru: zWsdotDate().describe(
    "Information is not available after this date."
  ),
});

/** ValidDateRange type */
export type ValidDateRange = z.infer<typeof validDateRangeSchema>;
