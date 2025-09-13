import { z } from "zod";
import { vesselClassSchema } from "./class.zod";
import { vesselSchema } from "./vessel.zod";

/**
 * Vessel basics schema for WSF Vessels API
 *
 * This operation retrieves the most basic / brief information pertaining to vessels.
 * A VesselID, or unique vessel identifier, may be optionally passed to retrieve a
 * specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed
 * as part of the URL string.
 */
export const vesselBasicsSchema = vesselSchema.extend({
  /** Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel. */
  Class: vesselClassSchema.describe(
    "Similar vessels in the fleet are grouped into the same class. This object describes the class associated with this vessel."
  ),

  /** Indicates the operational status of the vessel. 1 for InService, 2 for Maintenance, 3 for OutOfService. */
  Status: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .nullable()
    .describe(
      "Indicates the operational status of the vessel (1 = InService, 2 = Maintenance, 3 = OutOfService)."
    ),

  /** Indicates whether or not the vessel is owned by WSF. */
  OwnedByWSF: z
    .boolean()
    .describe("Indicates whether or not the vessel is owned by WSF."),
});

export type VesselBasics = z.infer<typeof vesselBasicsSchema>;

/**
 * Array of vessel basics.
 */
export const vesselBasicssSchema = z
  .array(vesselBasicsSchema)
  .describe(
    "The most basic information pertaining to vessels in the WSF fleet."
  );

export type VesselBasicss = z.infer<typeof vesselBasicssSchema>;
