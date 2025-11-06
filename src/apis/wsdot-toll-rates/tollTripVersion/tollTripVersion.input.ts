import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripVersionInputSchema = z
  .object({})
  .describe(
    "Retrieves current version information for toll trip rates data, returning version number and timestamp. Use for checking data freshness and version tracking."
  );

export type TollTripVersionInput = z.infer<typeof tollTripVersionInputSchema>;
