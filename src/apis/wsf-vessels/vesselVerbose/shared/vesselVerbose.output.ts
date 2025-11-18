import type { z } from "zod";
import { vesselAccommodationSchema } from "../../vesselAccommodations/shared/vesselAccommodations.output";
import { vesselBasicSchema } from "../../vesselBasics/shared/vesselBasics.output";
import { vesselStatSchema } from "../../vesselStats/shared/vesselStats.output";

export const vesselVerboseSchema = vesselBasicSchema
  .and(vesselAccommodationSchema)
  .and(vesselStatSchema)
  .describe(
    "Complete vessel information combining identification, operational status, accommodations, and technical specifications in a single schema."
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
