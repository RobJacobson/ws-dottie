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
