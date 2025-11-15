import { apis } from "@/apis/shared/apis";
import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";

export const cacheFlushDateVesselsGroup: EndpointGroup = {
  name: "cache-flush-date-vessels",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static wsf-vessels data.",
    description:
      "Timestamp indicating when any static endpoint data for the wsf-vessels API was last updated. Use this endpoint to determine when to invalidate cached vessel information. When the returned date changes, refresh cached data from static endpoints.",
    useCases: [
      "Poll periodically to detect when static vessel data has changed.",
      "Invalidate application cache when timestamp changes.",
      "Coordinate cache refresh across multiple static endpoints.",
    ],
  },
};

export const fetchCacheFlushDateVessels = createEndpoint<
  CacheFlushDateInput,
  CacheFlushDateOutput
>({
  api: apis.wsfVessels,
  group: cacheFlushDateVesselsGroup,
  functionName: "fetchCacheFlushDateVessels",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Get cache invalidation timestamp for static vessel data.",
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateVesselsInput = CacheFlushDateInput;
export type CacheFlushDateVessels = CacheFlushDateOutput;
