import { z } from "zod";

import { zodFetch } from "@/shared/fetching";
import { zPositiveInteger } from "@/shared/validation";
import { createVesselIdDescription } from "@/shared/validation/templates";

import { vesselBasicSchema, vesselClassSchema } from "./getVesselBasics";

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getVesselBasicsByIdParamsSchema = z
  .object({
    vesselId: zPositiveInteger("vessel").describe(
      createVesselIdDescription("whose basic information you want to retrieve")
    ),
  })
  .describe(
    "Parameters for fetching basic information for a specific vessel by ID"
  );

export type GetVesselBasicsByIdParams = z.infer<
  typeof getVesselBasicsByIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES (re-exported from getVesselBasics)
// ============================================================================

export { vesselBasicSchema, vesselClassSchema };
export type VesselBasic = z.infer<typeof vesselBasicSchema>;
export type VesselClass = z.infer<typeof vesselClassSchema>;

// ============================================================================
// API FUNCTION
// ============================================================================

const WSF_VESSELS_BASE = "/ferries/api/vessels/rest";

/**
 * API function for fetching vessel basics for a specific vessel from WSF Vessels API
 *
 * Retrieves basic vessel information for a specific vessel identified by vessel ID,
 * including vessel name, abbreviation, class information, and operational status.
 *
 * @param params - Object containing vesselId
 * @param params.vesselId - The unique identifier for the vessel (e.g., 1 for M/V Cathlamet)
 * @returns Promise resolving to a VesselBasic object containing basic information for the specified vessel
 *
 * @example
 * ```typescript
 * const vessel = await getVesselBasicsById({ vesselId: 1 });
 * console.log(vessel.VesselName); // "M/V Cathlamet"
 * ```
 */
export const getVesselBasicsById = async (
  params: GetVesselBasicsByIdParams
): Promise<VesselBasic> => {
  return zodFetch(
    `${WSF_VESSELS_BASE}/vesselbasics/{vesselId}`,
    {
      input: getVesselBasicsByIdParamsSchema,
      output: vesselBasicSchema,
    },
    params
  );
};
