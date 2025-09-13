import { z } from "zod";
import { vesselBasicsSchema } from "./vesselBasics.zod";

/**
 * Array of vessel basics
 *
 * The most basic information pertaining to vessels in the WSF fleet.
 */
export const vesselBasicssSchema = z
  .array(vesselBasicsSchema)
  .describe(
    "The most basic information pertaining to vessels in the WSF fleet."
  );

export type VesselBasicss = z.infer<typeof vesselBasicssSchema>;
