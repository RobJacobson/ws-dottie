import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictionsWithId input parameters
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const getCommercialVehicleRestrictionsWithIdSchema = z
  .object({})
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type GetCommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdSchema
>;
