import { z } from "zod";

/**
 * Schema for GetCommercialVehicleRestrictions input parameters
 */
export const GetCommercialVehicleRestrictionsInputSchema = z.object({});

export type GetCommercialVehicleRestrictionsInput = z.infer<
  typeof GetCommercialVehicleRestrictionsInputSchema
>;

/**
 * Schema for GetCommercialVehicleRestrictionsWithId input parameters
 */
export const GetCommercialVehicleRestrictionsWithIdInputSchema = z.object({});

export type GetCommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof GetCommercialVehicleRestrictionsWithIdInputSchema
>;
