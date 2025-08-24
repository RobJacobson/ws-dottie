import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { commercialVehicleRestrictionSchema } from "./getCommercialVehicleRestrictions";

// ============================================================================
// API Function
//
// getCommercialVehicleRestrictionsWithId
// ============================================================================

const ENDPOINT =
  "/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson";

/**
 * Get commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to array of commercial vehicle restriction data with unique IDs
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const restrictions = await getCommercialVehicleRestrictionsWithId({});
 * console.log(restrictions[0].UniqueID); // "12345"
 * ```
 */
export const getCommercialVehicleRestrictionsWithId = async (
  params: GetCommercialVehicleRestrictionsWithIdParams = {}
): Promise<CommercialVehicleRestrictionWithId[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getCommercialVehicleRestrictionsWithIdParamsSchema,
      output: commercialVehicleRestrictionWithIdArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getCommercialVehicleRestrictionsWithIdParamsSchema
// GetCommercialVehicleRestrictionsWithIdParams
// ============================================================================

export const getCommercialVehicleRestrictionsWithIdParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting commercial vehicle restriction data with unique IDs. The API returns all available restriction information including unique identifiers for each restriction."
  );

export type GetCommercialVehicleRestrictionsWithIdParams = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// commercialVehicleRestrictionWithIdSchema
// CommercialVehicleRestrictionWithId
// ============================================================================

export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema
    .extend({
      UniqueID: z
        .string()
        .describe(
          "Unique identifier assigned to this commercial vehicle restriction by the WSDOT system. This ID serves as a permanent, unique reference for the restriction across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
        ),
    })
    .catchall(z.unknown())
    .describe(
      "Commercial vehicle restriction information including all standard restriction details plus a unique identifier. This extended schema provides the same comprehensive restriction data as the base schema but includes a UniqueID field for system integration and data management purposes."
    );

export const commercialVehicleRestrictionWithIdArraySchema = z
  .array(commercialVehicleRestrictionWithIdSchema)
  .describe(
    "Array of commercial vehicle restriction data with unique identifiers for all restrictions across Washington State highways. This collection provides comprehensive restriction information including unique IDs for system integration and data management purposes."
  );

export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useCommercialVehicleRestrictionsWithId
// ============================================================================

/**
 * Hook for getting commercial vehicle restrictions with unique IDs from WSDOT Commercial Vehicle Restrictions API
 *
 * Returns commercial vehicle restriction data including weight limits, bridge restrictions,
 * and other commercial vehicle limitations across Washington State highways. This endpoint
 * includes unique identifiers for each restriction.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with commercial vehicle restriction data with unique IDs
 *
 * @example
 * ```typescript
 * const { data: restrictions } = useCommercialVehicleRestrictionsWithId({});
 * console.log(restrictions?.[0]?.UniqueID); // "12345"
 * ```
 */
export const useCommercialVehicleRestrictionsWithId = (
  params: GetCommercialVehicleRestrictionsWithIdParams = {},
  options?: TanStackOptions<CommercialVehicleRestrictionWithId[]>
): UseQueryResult<CommercialVehicleRestrictionWithId[], Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "commercial-vehicle-restrictions",
      "getCommercialVehicleRestrictionsWithId",
      JSON.stringify(params),
    ],
    queryFn: () => getCommercialVehicleRestrictionsWithId(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};
