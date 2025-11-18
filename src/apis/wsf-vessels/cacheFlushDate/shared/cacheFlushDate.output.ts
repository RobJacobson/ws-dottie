/**
 * @fileoverview Output schemas for cache flush date endpoint
 *
 * Re-exports shared cache flush date output schema with API-specific type names
 * for backward compatibility.
 */

import {
  type CacheFlushDateOutput,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";

export { cacheFlushDateOutputSchema };
export type { CacheFlushDateOutput };

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVessels = CacheFlushDateOutput;
