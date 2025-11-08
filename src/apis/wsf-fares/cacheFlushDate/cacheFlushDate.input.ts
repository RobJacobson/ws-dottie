/**
 * @fileoverview Input schemas for WSF Fares API CacheFlushDate endpoint
 *
 * These schemas define the input parameters for WSF Fares API CacheFlushDate endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for CacheFlushDate endpoint
 */
export const cacheFlushDateFaresInputSchema = z
  .object({})
  .describe(
    "Retrieves cache flush timestamp indicating when fares data was last updated."
  );

export type CacheFlushDateFaresInput = z.infer<
  typeof cacheFlushDateFaresInputSchema
>;
