import type { z } from "zod";
import { vesselAccommodationSchema } from "../vesselAccommodations/vesselAccommodations.output";
import { vesselBasicSchema } from "../vesselBasics/vesselBasics.output";
import { vesselStatSchema } from "../vesselStats/vesselStats.output";

/**
 * VesselVerbose schema
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselVerboseSchema = vesselBasicSchema
  .and(vesselAccommodationSchema)
  .and(vesselStatSchema)
  .describe(
    "Represents comprehensive vessel information combining identification, operational status, accommodations, accessibility features, and technical specifications in a single schema. E.g., vessel Tokitae (VesselID 68) in Olympic class with Status 1 (In Service), elevator and ADA accessible restrooms, 362 feet 5 inches long, 1500 passenger capacity, built 2014. Used when complete vessel information is needed in one response, reducing multiple API calls. Combines fields from vesselBasics, vesselAccommodations, and vesselStats schemas."
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
