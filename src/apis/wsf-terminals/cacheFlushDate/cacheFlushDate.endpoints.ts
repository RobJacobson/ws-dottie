import { apis } from "@/apis/shared/apis";
import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";

export const cacheFlushDateTerminalsGroup: EndpointGroup = {
  name: "cache-flush-date-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static wsf-terminals data.",
    description:
      "Timestamp indicating when static endpoint data for the wsf-terminals API was last updated. Use this endpoint to determine when to invalidate cached terminal information. When the returned date changes, refresh your cached data. Polled automatically by ws-dottie useQuery hooks.",
    useCases: [
      "Detect when static terminal data has changed and invalidate caches.",
      "Poll periodically to refresh cached terminal information.",
      "Coordinate cache invalidation across multiple terminal endpoints.",
    ],
  },
};

export const fetchCacheFlushDateTerminals = createEndpoint({
  api: apis.wsfTerminals,
  group: cacheFlushDateTerminalsGroup,
  functionName: "fetchCacheFlushDateTerminals",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Get cache invalidation timestamp for static wsf-terminals data.",
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
