import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictions input parameters
 */
export const getCommercialVehicleRestrictionsSchema = z.object({});

export type GetCommercialVehicleRestrictionsInput = z.infer<
  typeof getCommercialVehicleRestrictionsSchema
>;

/**
 * Schema for GetCommercialVehicleRestrictionsWithId input parameters
 */
export const getCommercialVehicleRestrictionsWithIdSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdSchema
>;
