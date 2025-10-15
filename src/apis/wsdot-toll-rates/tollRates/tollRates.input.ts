import { z } from "zod";

/**
 * Input schema for GetTollRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollRatesSchema = z
  .object({})
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTollRatesInput = z.infer<typeof getTollRatesSchema>;
