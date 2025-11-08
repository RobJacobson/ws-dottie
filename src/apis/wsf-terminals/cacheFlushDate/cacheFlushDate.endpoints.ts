import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  createCacheFlushDateEndpointGroup,
} from "@/shared/factories/createCacheFlushDateEndpoint";

export const cacheFlushDateTerminalsResource =
  createCacheFlushDateEndpointGroup("wsf-terminals", "terminals", "Terminals");

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
