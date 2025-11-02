import { z } from "zod";

/**
 * VesselAccommodations input schema
 *
 * This operation provides details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselAccommodationsSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves vessel accommodation details for all vessels, returning amenities, accessibility features, and passenger facilities. E.g., vessel Chimacum with elevator, ADA accessible restrooms, and galley. Use for passenger information displays, accessibility planning, and vessel feature comparison."
  );

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdSchema = z.object({
  VesselID: z
    .number()
    .int()
    .describe(
      "Unique vessel identifier, as an integer ID. E.g., '74' for vessel Chimacum, '1' for vessel Cathlamet. Required to retrieve accommodation details for a specific vessel."
    ),
});

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdSchema
>;
