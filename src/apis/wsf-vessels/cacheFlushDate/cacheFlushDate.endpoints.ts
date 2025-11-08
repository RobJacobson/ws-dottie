import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  createCacheFlushDateEndpointGroup,
} from "@/shared/factories/createCacheFlushDateEndpoint";

export const cacheFlushDateVesselsResource = createCacheFlushDateEndpointGroup(
  "wsf-vessels",
  "vessels",
  "Vessels"
);

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
export type CacheFlushDateVessels = CacheFlushDateOutput;
