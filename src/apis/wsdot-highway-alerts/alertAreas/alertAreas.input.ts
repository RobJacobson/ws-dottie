import { z } from "@/shared/zod";

/**
 * Input schema for AlertAreas endpoint
 *
 * Return list of areas and associated IDs
 */
export const mapAreasInputSchema = z
  .object({})
  .describe(
    "Retrieves list of available map areas with identifiers and descriptions. Use to obtain valid map area codes for filtering alerts by geographic area."
  );

export type MapAreasInput = z.infer<typeof mapAreasInputSchema>;
