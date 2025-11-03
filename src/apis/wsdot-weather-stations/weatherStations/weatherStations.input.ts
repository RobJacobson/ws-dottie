import { z } from "@/shared/zod-openapi-init";

/**
 * GetCurrentStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const getCurrentStationsSchema = z
  .object({})
  .describe(
    "Retrieves metadata for all weather stations statewide, returning station identifiers, names, and location coordinates. Use for weather station discovery and location-based station queries."
  );

export type GetCurrentStationsInput = z.infer<typeof getCurrentStationsSchema>;
