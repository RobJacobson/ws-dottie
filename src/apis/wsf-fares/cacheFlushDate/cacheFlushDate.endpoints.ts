import { apis } from "@/apis/shared/apis";
import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";

export const cacheFlushDateFaresGroup: EndpointGroup = {
  name: "cache-flush-date-fares",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for static WSF fares data.",
    description:
      "Returns the UTC datetime when static endpoint data for the wsf-fares API was last updated. Use this endpoint to determine when to invalidate cached fares information.",
    useCases: [
      "Poll periodically to detect when static fares data has changed.",
      "Invalidate application cache when the returned date changes.",
      "Coordinate cache refresh across multiple static endpoints.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchCacheFlushDateFares = createEndpoint({
  api: apis.wsfFares,
  group: cacheFlushDateFaresGroup,
  functionName: "fetchCacheFlushDateFares",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static fares data.",
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateFaresInput = CacheFlushDateInput;
export type CacheFlushDateFares = CacheFlushDateOutput;
