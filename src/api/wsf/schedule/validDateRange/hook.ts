// Schedule Valid Date Range hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import { getValidDateRange } from "./api";

/**
 * Hook for fetching valid date range from WSF API
 *
 * Retrieves the valid date range for all WSF API operations.
 * This data is updated infrequently and provides static date
 * range information used to determine which dates are supported by the API.
 *
 * @returns React Query result with ValidDateRange object
 */
export const useValidDateRange = () => {
  return useQuery({
    queryKey: ["schedule", "validDateRange"],
    queryFn: getValidDateRange,
    ...createInfrequentUpdateOptions(),
  });
};
