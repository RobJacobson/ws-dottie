import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateVessels } from "./getCacheFlushDateVessels";
// Import schemas and types from the single-item endpoint
import { type VesselBasic, vesselBasicSchema } from "./getVesselBasicsById";

// ============================================================================
// API Function
//
// getVesselBasics
// ============================================================================

const ENDPOINT = "/ferries/api/vessels/rest/vesselbasics";

/**
 * API function for fetching vessel basics from WSF Vessels API
 *
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * @returns Promise resolving to an array of VesselBasic objects containing basic vessel information
 *
 * @example
 * ```typescript
 * const vessels = await getVesselBasics();
 * console.log(vessels[0].VesselName); // "Cathlamet"
 * ```
 */
export const getVesselBasics = async (): Promise<VesselBasic[]> => {
  return zodFetch(ENDPOINT, {
    output: vesselBasicArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// getVesselBasicsParamsSchema
// GetVesselBasicsParams
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// Output Schema & Types
//
// vesselBasicArraySchema
// VesselBasic
// ============================================================================

const zDate = () => z.string();

export const vesselBasicArraySchema = z
  .array(vesselBasicSchema)
  .describe(
    "Array of basic vessel information for all vessels in the Washington State Ferries fleet. Each entry contains fundamental vessel details including names, abbreviations, class information, and operational status."
  );

// ============================================================================
// TanStack Query Hook
//
// useVesselBasics
// ============================================================================

/**
 * Hook for fetching vessel basics from WSF Vessels API
 *
 * Retrieves basic vessel information including vessel names, abbreviations,
 * class information, and operational status. This endpoint provides fundamental
 * vessel details for all vessels in the WSF fleet.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of VesselBasic objects with basic vessel information
 *
 * @example
 * ```typescript
 * const { data: vessels } = useVesselBasics();
 * console.log(vessels?.[0]?.VesselName); // "Cathlamet"
 * ```
 */
export const useVesselBasics = (options?: TanStackOptions<VesselBasic[]>) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "vessels", "basics"],
    queryFn: getVesselBasics,
    fetchLastUpdateTime: getCacheFlushDateVessels,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
