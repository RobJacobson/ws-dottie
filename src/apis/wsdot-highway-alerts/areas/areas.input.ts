import { z } from "zod";

/**
 * Input schema for GetMapAreas endpoint
 *
 * Return list of areas and associated IDs
 */
export const getMapAreasSchema = z
  .object({})
  .describe("Return list of areas and associated IDs");

export type GetMapAreasInput = z.infer<typeof getMapAreasSchema>;
