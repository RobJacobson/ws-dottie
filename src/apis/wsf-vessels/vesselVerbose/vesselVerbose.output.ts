import type { z } from "zod";
import { vesselAccommodationsSchema } from "../vesselAccommodations/vesselAccommodations.output";
import { vesselBasicSchema } from "../vesselBasics/vesselBasics.output";
import { vesselStatsSchema } from "../vesselStats/vesselStats.output";

/**
 * VesselVerbose schema
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselVerboseSchema = vesselBasicSchema
  .and(vesselAccommodationsSchema)
  .and(vesselStatsSchema)
  .describe(
    "Contains highly detailed information pertaining to vessels, combining data from basic details, accommodations, and stats endpoints."
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
