import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for CVRestrictionData input parameters
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const commercialVehicleRestrictionsInputSchema = z
  .object({})
  .describe(
    "Retrieves all commercial vehicle restrictions statewide, returning bridge and road restrictions including weight limits, height restrictions, location data, and effective dates. Use for commercial vehicle route planning and compliance checking."
  );

export type CommercialVehicleRestrictionsInput = z.infer<typeof commercialVehicleRestrictionsInputSchema>;
