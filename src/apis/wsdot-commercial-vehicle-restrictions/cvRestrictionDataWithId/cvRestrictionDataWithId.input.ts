import { z } from "@/shared/zod";

/**
 * Schema for CVRestrictionDataWithId input parameters
 *
 * Provides list of restrictions for commercial vehicles. Coverage Area: Statewide.
 */
export const commercialVehicleRestrictionsWithIdInputSchema = z
  .object({})
  .describe(
    "Retrieves all commercial vehicle restrictions statewide with unique identifiers, returning bridge and road restrictions including weight limits, height restrictions, location data, effective dates, and unique restriction IDs. Use for commercial vehicle route planning and restriction tracking with ID-based lookups."
  );

export type CommercialVehicleRestrictionsWithIdInput = z.infer<
  typeof commercialVehicleRestrictionsWithIdInputSchema
>;
