import { z } from "zod";
import { vesselVerboseSchema } from "./vesselVerbose.zod";

/**
 * Array of vessel verbose data
 *
 * Highly detailed information pertaining to vessels in the WSF fleet.
 */
export const vesselVerbosesSchema = z
  .array(vesselVerboseSchema)
  .describe(
    "Highly detailed information pertaining to vessels in the WSF fleet."
  );

export type VesselVerboses = z.infer<typeof vesselVerbosesSchema>;
