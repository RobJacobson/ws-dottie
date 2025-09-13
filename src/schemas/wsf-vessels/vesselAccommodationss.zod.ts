import { z } from "zod";
import { vesselAccommodationsSchema } from "./vesselAccommodations.zod";

/**
 * Array of vessel accommodations
 *
 * The accommodation details for vessels in the WSF fleet.
 */
export const vesselAccommodationssSchema = z
  .array(vesselAccommodationsSchema)
  .describe("The accommodation details for vessels in the WSF fleet.");

export type VesselAccommodationss = z.infer<typeof vesselAccommodationssSchema>;
