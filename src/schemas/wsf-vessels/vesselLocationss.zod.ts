import { z } from "zod";
import { vesselLocationsSchema } from "./vesselLocations.zod";

/**
 * Array of vessel locations
 *
 * The current locations and associated ETA data for vessels in the WSF fleet.
 */
export const vesselLocationssSchema = z
  .array(vesselLocationsSchema)
  .describe(
    "The current locations and associated ETA data for vessels in the WSF fleet."
  );

export type VesselLocationss = z.infer<typeof vesselLocationssSchema>;
