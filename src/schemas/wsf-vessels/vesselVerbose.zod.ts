import { z } from "zod";
import { vesselBasicsSchema } from "./vesselBasics.zod";
import { vesselAccommodationsSchema } from "./vesselAccommodations.zod";
import { vesselStatsSchema } from "./vesselStats.zod";

/**
 * Vessel verbose schema for WSF Vessels API
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should
 * be used if you need to reduce the "chattiness" of your application and don't mind
 * receiving a larger payload of data. The results include and expand on what's already
 * available through the following operations:
 *
 * - /vesselbasics
 * - /vesselbasics/{VesselID}
 * - /vesselaccommodations
 * - /vesselaccommodations/{VesselID}
 * - /vesselstats
 * - /vesselstats/{VesselID}
 *
 * A VesselID, or unique vessel identifier, may be optionally passed to retrieve a
 * specific vessel. A valid API Access Code from the WSDOT Traveler API must be passed
 * as part of the URL string.
 */
export const vesselVerboseSchema = vesselBasicsSchema
  .merge(
    vesselAccommodationsSchema.omit({
      VesselID: true,
      VesselSubjectID: true,
      VesselName: true,
      VesselAbbrev: true,
      Class: true,
    })
  )
  .merge(
    vesselStatsSchema.omit({
      VesselID: true,
      VesselSubjectID: true,
      VesselName: true,
      VesselAbbrev: true,
      Class: true,
    })
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;

/**
 * Array of vessel verbose data
 *
 * Highly detailed information pertaining to vessels in the WSF fleet.
 */
export const vesselVerboseArraySchema = z
  .array(vesselVerboseSchema)
  .describe(
    "Highly detailed information pertaining to vessels in the WSF fleet."
  );

export type VesselVerboseArray = z.infer<typeof vesselVerboseArraySchema>;
