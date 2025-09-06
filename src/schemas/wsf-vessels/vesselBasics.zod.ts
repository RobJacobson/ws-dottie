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

  /** Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. */
  Status: z
    .number()
    .int()
    .nullable()
    .describe(
      "Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service."
    ),

  /** Indicates whether or not the vessel is owned by WSF. */
  OwnedByWSF: z
    .boolean()
    .describe("Indicates whether or not the vessel is owned by WSF."),
});

export type VesselBasics = z.infer<typeof vesselBasicsSchema>;

/**
 * Array of vessel basics
 *
 * The most basic information pertaining to vessels in the WSF fleet.
 */
export const vesselBasicsArraySchema = z
  .array(vesselBasicsSchema)
  .describe(
    "The most basic information pertaining to vessels in the WSF fleet."
  );

export type VesselBasicsArray = z.infer<typeof vesselBasicsArraySchema>;
