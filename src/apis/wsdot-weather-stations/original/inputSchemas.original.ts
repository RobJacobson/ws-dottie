import { z } from "zod";

/**
 * GetCurrentStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const getCurrentStationsSchema = z
  .object({})
  .describe(
    "Provides current information from weather stations. Coverage Area: Statewide."
  );

export type GetCurrentStationsInput = z.infer<typeof getCurrentStationsSchema>;
