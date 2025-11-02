import { z } from "zod";

/**
 * Input schema for GetMapAreas endpoint
 *
 * Return list of areas and associated IDs
 */
export const getMapAreasSchema = z
  .object({})
  .describe(
    "Retrieves list of available map areas with identifiers and descriptions. Use to obtain valid map area codes for filtering alerts by geographic area."
  );

export type GetMapAreasInput = z.infer<typeof getMapAreasSchema>;
