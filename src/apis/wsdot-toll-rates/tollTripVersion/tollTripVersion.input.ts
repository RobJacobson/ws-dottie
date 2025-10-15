import { z } from "zod";

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollTripVersionSchema = z
  .object({})
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTollTripVersionInput = z.infer<typeof getTollTripVersionSchema>;
