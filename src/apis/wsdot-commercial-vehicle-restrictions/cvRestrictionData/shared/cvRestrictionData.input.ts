import { z } from "@/shared/zod";

export const commercialVehicleRestrictionsInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving all commercial vehicle restrictions statewide."
  );

export type CommercialVehicleRestrictionsInput = z.infer<
  typeof commercialVehicleRestrictionsInputSchema
>;
