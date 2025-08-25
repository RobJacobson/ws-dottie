import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getTollTripVersion
// ============================================================================

const ENDPOINT =
  "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson";

/**
 * Retrieves API version and timestamp information from WSDOT Toll Rates API
 *
 * Returns current API version number and last update timestamp for the WSDOT Toll Rates system.
 * This endpoint provides metadata about the toll rates API including version information and
 * last update times, which is useful for tracking API changes, ensuring data freshness, and
 * monitoring system status for all toll facilities in Washington State.
 *
 * @returns Promise containing API version and timestamp information for toll rates system
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const versionInfo = await getTollTripVersion();
 * console.log(versionInfo.Version); // 348380
 * console.log(versionInfo.TimeStamp); // Date object
 * ```
 */
export const getTollTripVersion = async (): Promise<TollTripVersion> => {
  return zodFetch(ENDPOINT, {
    input: getTollTripVersionParamsSchema,
    output: tollTripVersionSchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getTollTripVersionParamsSchema
// GetTollTripVersionParams
// ============================================================================

export const getTollTripVersionParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll rates API version and timestamp information. The API returns current version number and last update timestamp for the WSDOT Toll Rates system, which is essential for tracking API changes and ensuring data freshness."
  );

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// tollTripVersionSchema
// TollTripVersion
// ============================================================================

export const tollTripVersionSchema = z
  .object({
    TimeStamp: zWsdotDate().describe(
      "Timestamp indicating when the API version information was last updated in the WSDOT system. This field shows the currency of the version data and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Version: z
      .number()
      .describe(
        "Current API version number for the WSDOT toll rates system. This field indicates the version of the API specification and data format currently in use. Higher version numbers indicate more recent API updates."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "API version and timestamp information for the WSDOT Toll Rates API. This schema represents version tracking data that enables API consumers to verify they are using the most current API specification and data format."
  );

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTollTripVersion
// ============================================================================

/**
 * Hook for retrieving API version and timestamp information from WSDOT Toll Rates API
 *
 * Returns current API version number and last update timestamp for the WSDOT Toll Rates system.
 * This hook provides metadata about the toll rates API including version information and
 * last update times, which is useful for tracking API changes, ensuring data freshness, and
 * monitoring system status for all toll facilities in Washington State.
 *
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with API version and timestamp information for toll rates system
 *
 * @example
 * ```typescript
 * const { data: versionInfo } = useTollTripVersion();
 * console.log(versionInfo?.Version); // Current API version number
 * console.log(versionInfo?.TimeStamp); // Last update timestamp
 * ```
 */
export const useTollTripVersion = (
  options?: TanStackOptions<TollTripVersion>
): UseQueryResult<TollTripVersion, Error> => {
  return useQuery({
    queryKey: ["wsdot", "toll-rates", "getTollTripVersion"],
    queryFn: () => getTollTripVersion(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
