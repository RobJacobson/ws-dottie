import { z } from "zod";

/**
 * VesselLocations input schema
 *
 * This operation provides vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselLocationsSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves real-time vessel location data for all vessels in the fleet, returning GPS coordinates, terminal assignments, speed/heading, and ETA information. E.g., vessel Chelan at position 48.529468, -122.818977 departing Friday Harbor at 15.7 knots. Use for fleet monitoring, passenger information systems, and real-time vessel tracking. Updates every 5 seconds."
  );

export type VesselLocationsInput = z.infer<typeof vesselLocationsSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdSchema = z.object({
  VesselID: z
    .number()
    .int()
    .describe(
      "Unique vessel identifier, as an integer ID. E.g., '2' for vessel Chelan, '38' for vessel Yakima. Required to retrieve real-time location data for a specific vessel."
    ),
});

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdSchema
>;
