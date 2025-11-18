import { z } from "@/shared/zod";

export const vesselAccommodationsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Input parameters for retrieving vessel accommodations for all vessels."
  );

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsInputSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdInputSchema = z
  .object({
    VesselID: z.number().int().describe("Numeric ID of the vessel."),
  })
  .describe(
    "Input parameters for retrieving vessel accommodations for a specific vessel."
  );

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdInputSchema
>;
