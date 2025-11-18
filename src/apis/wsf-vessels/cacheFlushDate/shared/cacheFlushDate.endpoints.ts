import type { EndpointGroupMeta, EndpointMeta } from "@/apis/types";
import {
  type CacheFlushDateInput,
  cacheFlushDateInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateOutput,
  cacheFlushDateOutputSchema,
} from "./cacheFlushDate.output";

/**
 * Endpoint group metadata for cache flush date endpoints
 */
export const cacheFlushDateVesselsGroup: EndpointGroupMeta = {
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

export const cacheFlushDateVesselsMeta = {
  functionName: "fetchCacheFlushDateVessels",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription: "Get cache flush timestamp for static wsf-vessels data.",
} satisfies EndpointMeta<CacheFlushDateInput, CacheFlushDateOutput>;

export const cacheFlushDateVesselsEndpoints = {
  cacheFlushDate: cacheFlushDateVesselsMeta,
} as const;
