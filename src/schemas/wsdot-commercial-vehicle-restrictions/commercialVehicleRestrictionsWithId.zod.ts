import { z } from "zod";
import { commercialVehiclesRestrictionSchema } from "./commercialVehicleRestrictions.zod";

/**
 * CVRestrictionWithId schema
 *
 * Represents a Commercial Vehicle Restriction with UniqueID.
 * Extends the base commercialVehiclesRestrictionSchema and adds the UniqueID field.
 */
export const commercialVehiclesRestrictionWithIdSchema =
  commercialVehiclesRestrictionSchema
    .extend({
      /** Unique restriction identifier */
      UniqueID: z.string().describe("Unique restriction identifier"),
    })
    .describe("Represents a Commercial Vehicle Restriction with UniqueID.");

/**
 * CVRestrictionsWithId schema
 *
 * Coverage Area: Statewide. Provides list of restrictions for commercial vehicles with UniqueID.
 */
export const commercialVehiclesRestrictionsWithIdSchema = z
  .array(commercialVehiclesRestrictionWithIdSchema)
  .describe(
    "Coverage Area: Statewide. Provides list of restrictions for commercial vehicles with UniqueID."
  );

/** CVRestrictionWithId type */
export type CommercialVehiclesRestrictionWithId = z.infer<
  typeof commercialVehiclesRestrictionWithIdSchema
>;

/** CVRestrictionsWithId type */
export type CommercialVehiclesRestrictionsWithId = z.infer<
  typeof commercialVehiclesRestrictionsWithIdSchema
>;
