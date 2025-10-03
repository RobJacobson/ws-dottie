import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictions input parameters
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles.
 */
export const getCommercialVehicleRestrictionsSchema = z.object({});

export type GetCommercialVehicleRestrictionsInput = z.infer<
  typeof getCommercialVehicleRestrictionsSchema
>;

/**
 * Schema for GetCommercialVehicleRestrictionsWithId input parameters
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles.
 */
export const getCommercialVehicleRestrictionsWithIdSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdSchema
>;
