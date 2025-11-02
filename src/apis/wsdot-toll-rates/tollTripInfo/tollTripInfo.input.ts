import { z } from "zod";

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollTripInfoSchema = z
  .object({})
  .describe(
    "Retrieves toll trip information for all trips statewide, returning trip routes, geometry data, location coordinates, and modification timestamps. Use for toll trip route discovery and trip information lookups."
  );

export type GetTollTripInfoInput = z.infer<typeof getTollTripInfoSchema>;
