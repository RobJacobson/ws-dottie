import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { vesselBaseSchema, vesselClassSchema } from "../shared/vesselBase";

/**
 * VesselBasic schema
 *
 * This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselBasicSchema = vesselBaseSchema.extend({
  /**
   * Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService).
   */
  Status: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .nullable()
    .describe(
      "Indicates the operational status of the vessel. 1 for In Service, 2 for Maintenance and 3 for Out of Service. (1 = InService, 2 = Maintenance, 3 = OutOfService)."
    ),
  /**
   * Indicates whether or not the vessel is owned by WSF.
   */
  OwnedByWSF: z
    .boolean()
    .describe("Indicates whether or not the vessel is owned by WSF."),
});

export type VesselBasic = z.infer<typeof vesselBasicSchema>;
