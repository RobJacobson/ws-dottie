// Schedule Valid Date Range API functions

import { fetchWsf } from "@/shared/fetching/fetch";
import type { ValidDateRange } from "../types";

/**
 * API function for fetching valid date range from WSF API
 * This is a general infrastructure endpoint used across all WSF API operations
 */
export const getValidDateRange = (): Promise<ValidDateRange | null> =>
  fetchWsf<ValidDateRange>("schedule", "/validdaterange");
