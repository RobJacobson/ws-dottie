import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  createCacheFlushDateEndpointGroup,
} from "@/shared/factories/createCacheFlushDateEndpoint";

export const cacheFlushDateFaresGroup = createCacheFlushDateEndpointGroup(
  "wsf-fares",
  "fares",
  "Fares"
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateFaresInput = CacheFlushDateInput;
export type CacheFlushDateFares = CacheFlushDateOutput;
