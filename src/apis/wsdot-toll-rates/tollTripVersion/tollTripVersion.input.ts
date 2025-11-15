import { z } from "@/shared/zod";

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripVersionInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving current version information for toll trip rates data."
  );

export type TollTripVersionInput = z.infer<typeof tollTripVersionInputSchema>;
