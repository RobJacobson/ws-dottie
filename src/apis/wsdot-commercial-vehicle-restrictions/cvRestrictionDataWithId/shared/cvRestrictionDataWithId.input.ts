import { z } from "@/shared/zod";

export const commercialVehicleRestrictionsWithIdInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving all commercial vehicle restrictions with unique identifiers statewide."
  );

export type CommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof commercialVehicleRestrictionsWithIdInputSchema
>;
