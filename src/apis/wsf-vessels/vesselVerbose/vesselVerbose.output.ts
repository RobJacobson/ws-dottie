import type { z } from "zod";
import { vesselAccommodationSchema } from "../vesselAccommodations/vesselAccommodations.output";
import { vesselBasicSchema } from "../vesselBasics/vesselBasics.output";
import { vesselStatSchema } from "../vesselStats/vesselStats.output";

export const vesselVerboseSchema = vesselBasicSchema
  .and(vesselAccommodationSchema)
  .and(vesselStatSchema)
  .describe(
    "Complete vessel information combining identification, operational status, accommodations, and technical specifications in a single schema."
  );

export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
