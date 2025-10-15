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
    "This operation retrieves details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdSchema
>;
