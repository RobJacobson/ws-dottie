import { z } from "@/shared/zod-openapi-init";

/**
 * CacheFlushDate input schema
 */
export const cacheFlushDateVesselsInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves cache flush timestamp indicating when any static endpoint data for the wsf-vessels API was last updated."
  );

export type CacheFlushDateVesselsInput = z.infer<
  typeof cacheFlushDateVesselsInputSchema
>;
