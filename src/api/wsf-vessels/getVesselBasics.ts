import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/validation";

// Import schemas and types from the single-item endpoint
import { type VesselBasic, vesselBasicSchema } from "./getVesselBasicsById";

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

const zDate = () => zWsdotDate();

export const vesselBasicArraySchema = z
  .array(vesselBasicSchema)
  .describe(
    "Array of basic vessel information for all vessels in the Washington State Ferries fleet. Each entry contains fundamental vessel details including names, abbreviations, class information, and operational status."
  );

// ============================================================================
// API FUNCTION
// ============================================================================

const WSF_VESSELS_BASE = "/ferries/api/vessels/rest";

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
  return zodFetch(`${WSF_VESSELS_BASE}/vesselbasics`, {
    output: vesselBasicArraySchema,
  });
};
