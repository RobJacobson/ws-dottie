import { z } from "zod";

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollTripInfoSchema = z
  .object({})
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTollTripInfoInput = z.infer<typeof getTollTripInfoSchema>;
