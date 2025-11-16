import { z } from "@/shared/zod";

/**
 * Input schema for AlertAreas endpoint
 *
 * Return list of areas and associated IDs
 */
export const mapAreasInputSchema = z
  .object({})
  .describe(
    "Input for retrieving all available map areas with area codes and descriptions."
  );

export type MapAreasInput = z.infer<typeof mapAreasInputSchema>;
