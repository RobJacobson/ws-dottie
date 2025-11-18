import { z } from "@/shared/zod";

/**
 * Input schema for GetTollRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollRatesInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving current toll rates for all HOV toll lanes."
  );

export type TollRatesInput = z.infer<typeof tollRatesInputSchema>;
