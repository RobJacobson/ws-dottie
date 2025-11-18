/**
 * @fileoverview Input schemas for cache flush date endpoint
 *
 * Re-exports shared cache flush date input schema with API-specific type names
 * for backward compatibility.
 */

import {
  type CacheFlushDateInput,
  cacheFlushDateInputSchema,
} from "@/apis/shared/cacheFlushDate";

export { cacheFlushDateInputSchema };
export type { CacheFlushDateInput };

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
