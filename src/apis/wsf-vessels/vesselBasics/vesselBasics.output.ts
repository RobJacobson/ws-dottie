import { z } from "zod";
import { vesselBaseSchema } from "../shared/vesselBase";

/**
 * VesselBasic schema
 *
 * This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselBasicSchema = vesselBaseSchema
  .extend({
    Status: z
      .union([z.literal(1), z.literal(2), z.literal(3)])
      .nullable()
      .describe(
        "Vessel operational status, as a status code. Valid values: 1 (In Service), 2 (Maintenance), 3 (Out of Service). E.g., '1' indicates vessel is available for passenger service like Chimacum, '2' indicates scheduled maintenance, '3' indicates vessel is unavailable. Null when status is unknown. Determines whether vessel is available for route assignments and passenger operations."
      ),
    OwnedByWSF: z
      .boolean()
      .describe(
        "Vessel ownership indicator, as a boolean flag. E.g., true for WSF-owned vessels like Chimacum and Chelan, false for chartered or leased vessels. Determines vessel management responsibility and operational control."
      ),
  })
  .describe(
    "Represents basic vessel information including identification, class association, operational status, and ownership. E.g., vessel Chimacum (VesselID 74) in Olympic class with Status 1 (In Service) and OwnedByWSF true. Used for vessel selection, status displays, and determining vessel availability. Extends vesselBaseSchema with operational status fields."
  );

export type VesselBasic = z.infer<typeof vesselBasicSchema>;
