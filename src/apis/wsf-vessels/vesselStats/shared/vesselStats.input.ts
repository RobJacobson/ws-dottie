import { z } from "@/shared/zod";

export const vesselStatsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Input parameters for retrieving vessel technical specifications for all vessels."
  );

export type VesselStatsInput = z.infer<typeof vesselStatsInputSchema>;

/**
 * VesselStatsById input schema
 */
export const vesselStatsByIdInputSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
  })
  .describe(
    "Input parameters for retrieving vessel technical specifications for a specific vessel."
  );

export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdInputSchema>;
