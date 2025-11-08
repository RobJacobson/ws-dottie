import { z } from "@/shared/zod";

/**
 * VesselAccommodations input schema
 *
 * This operation provides details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselAccommodationsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves vessel accommodation details for all vessels, returning amenities, accessibility features, and passenger facilities. E.g., vessel Chimacum with elevator, ADA accessible restrooms, and galley. Use for passenger information displays, accessibility planning, and vessel feature comparison."
  );

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsInputSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '74' for vessel Chimacum, '1' for vessel Cathlamet. Required to retrieve accommodation details for a specific vessel."
      ),
  })
  .describe(
    "Retrieves vessel accommodation details for a specific vessel by VesselID, returning amenities, accessibility features, and passenger facilities. E.g., vessel Chetzemoka with elevator access, ADA accessible restrooms, and main cabin galley. Use for passenger information displays, accessibility planning, and vessel feature comparison when you need details for a single vessel."
  );

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdInputSchema
>;
