import { z } from "zod";
import { commercialVehicleRestrictionSchema } from "./commercialVehicleRestriction.zod";

/**
 * CommercialVehicleRestrictions schema
 *
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles.
 */
export const commercialVehicleRestrictionsSchema = z
  .array(commercialVehicleRestrictionSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles."
  );

/** CommercialVehicleRestrictions type */
export type CommercialVehicleRestrictions = z.infer<
  typeof commercialVehicleRestrictionsSchema
>;
