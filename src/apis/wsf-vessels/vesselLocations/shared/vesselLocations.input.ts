import { z } from "@/shared/zod";

export const vesselLocationsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Input parameters for retrieving real-time vessel locations for all vessels."
  );

export type VesselLocationsInput = z.infer<typeof vesselLocationsInputSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdInputSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
  })
  .describe(
    "Input parameters for retrieving real-time vessel location for a specific vessel."
  );

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdInputSchema
>;
