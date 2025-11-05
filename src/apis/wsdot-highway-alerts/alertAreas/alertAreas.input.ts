import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for AlertAreas endpoint
 *
 * Return list of areas and associated IDs
 */
export const alertAreasSchema = z
  .object({})
  .describe(
    "Retrieves list of available map areas with identifiers and descriptions. Use to obtain valid map area codes for filtering alerts by geographic area."
  );

export type AlertAreasInput = z.infer<typeof alertAreasSchema>;
