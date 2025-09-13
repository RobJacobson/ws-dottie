import { z } from "zod";
import { commercialVehicleRestrictionWithIdSchema } from "./commercialVehicleRestrictionWithId.zod";

/**
 * CommercialVehicleRestrictionsWithId schema
 *
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles with UniqueID.
 */
export const commercialVehicleRestrictionsWithIdSchema = z
  .array(commercialVehicleRestrictionWithIdSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles with UniqueID."
  );

/** CommercialVehicleRestrictionsWithId type */
export type CommercialVehicleRestrictionsWithId = z.infer<
  typeof commercialVehicleRestrictionsWithIdSchema
>;
