import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictions input parameters
 */
export const getCommercialVehicleRestrictionsInputSchema = z.object({});

export type GetCommercialVehicleRestrictionsInput = z.infer<
  typeof getCommercialVehicleRestrictionsInputSchema
>;

/**
 * Schema for GetCommercialVehicleRestrictionsWithId input parameters
 */
export const getCommercialVehicleRestrictionsWithIdInputSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof getCommercialVehicleRestrictionsWithIdInputSchema
>;
