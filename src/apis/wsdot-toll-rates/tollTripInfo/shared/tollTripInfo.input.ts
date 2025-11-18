import { z } from "@/shared/zod";

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripInfoInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving trip information for all toll trips."
  );

export type TollTripInfoInput = z.infer<typeof tollTripInfoInputSchema>;
