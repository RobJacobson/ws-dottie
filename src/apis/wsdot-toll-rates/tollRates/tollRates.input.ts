import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for GetTollRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollRatesSchema = z
  .object({})
  .describe(
    "Retrieves current toll rates for all HOV (high occupancy vehicle) toll lanes statewide, returning trip information, current toll amounts in cents, route associations, and update timestamps. Use for real-time toll rate monitoring and toll calculation."
  );

export type GetTollRatesInput = z.infer<typeof getTollRatesSchema>;
