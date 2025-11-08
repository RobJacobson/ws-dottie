import { z } from "@/shared/zod";

/**
 * VesselLocations input schema
 *
 * This operation provides vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselLocationsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves real-time vessel location data for all vessels in the fleet, returning GPS coordinates, terminal assignments, speed/heading, and ETA information. E.g., vessel Chelan at position 48.529468, -122.818977 departing Friday Harbor at 15.7 knots. Use for fleet monitoring, passenger information systems, and real-time vessel tracking. Updates every 5 seconds."
  );

export type VesselLocationsInput = z.infer<typeof vesselLocationsInputSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdInputSchema = z
  .object({
    VesselID: z
      .number()
      .int()
      .describe(
        "Unique vessel identifier, as an integer ID. E.g., '2' for vessel Chelan, '38' for vessel Yakima. Required to retrieve real-time location data for a specific vessel."
      ),
  })
  .describe(
    "Retrieves real-time vessel location data for a specific vessel by VesselID, returning GPS coordinates, terminal assignments, speed/heading, and ETA information. E.g., vessel Kitsap at position 47.981485, -122.222075 at Everett Harbor terminal. Use for vessel monitoring, passenger information systems, and real-time vessel tracking when you need location data for a single vessel. Updates every 5 seconds."
  );

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdInputSchema
>;
