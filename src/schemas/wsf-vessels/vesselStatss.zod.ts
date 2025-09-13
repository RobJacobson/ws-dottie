import { z } from "zod";
import { vesselStatsSchema } from "./vesselStats.zod";

/**
 * Array of vessel stats
 *
 * The specification details for vessels in the WSF fleet.
 */
export const vesselStatssSchema = z
  .array(vesselStatsSchema)
  .describe("The specification details for vessels in the WSF fleet.");

export type VesselStatss = z.infer<typeof vesselStatssSchema>;
