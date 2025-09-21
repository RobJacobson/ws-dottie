import { z } from "zod";

/**
 * GetCurrentStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const getCurrentStationsInputSchema = z.object({});

export type GetCurrentStationsInput = z.infer<
  typeof getCurrentStationsInputSchema
>;
