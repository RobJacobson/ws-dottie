import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictions input parameters
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const getCommercialVehicleRestrictionsSchema = z
  .object({})
  .describe(
    "Provides list of restrictions for commercial vehicles. Coverage Area: Statewide."
  );

export type GetCommercialVehicleRestrictionsInput = z.infer<
  typeof getCommercialVehicleRestrictionsSchema
>;

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
