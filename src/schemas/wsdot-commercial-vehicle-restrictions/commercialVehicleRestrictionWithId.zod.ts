import { z } from "zod";

import { commercialVehicleRestrictionSchema } from "./commercialVehicleRestriction.zod";

/**
 * CommercialVehicleRestrictionWithId schema
 *
 * Represents a Commercial Vehicle Restriction with UniqueID.
 * Extends the base commercialVehicleRestrictionSchema and adds the UniqueID field.
 */
export const commercialVehicleRestrictionWithIdSchema =
  commercialVehicleRestrictionSchema
    .extend({
      /** Unique restriction identifier */
      UniqueID: z.string().nullable().describe("Unique restriction identifier"),
    })
    .describe("Represents a Commercial Vehicle Restriction with UniqueID.");

/** CommercialVehicleRestrictionWithId type */
export type CommercialVehicleRestrictionWithId = z.infer<
  typeof commercialVehicleRestrictionWithIdSchema
>;

/**
 * Array of commercial vehicle restrictions with ID.
 */
export const commercialVehicleRestrictionsWithIdSchema = z
  .array(commercialVehicleRestrictionWithIdSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles with UniqueID."
  );

export type CommercialVehicleRestrictionsWithId = z.infer<
  typeof commercialVehicleRestrictionsWithIdSchema
>;
