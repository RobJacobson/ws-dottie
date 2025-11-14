import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";

export const cacheFlushDateFaresGroup = defineEndpointGroup({
  name: "cache-flush-date-fares",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-fares API was last updated. This information helps applications determine when to refresh cached fares information through cache invalidation.",
    businessContext:
      "Many wsf-fares endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-fares data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
});

export const fetchCacheFlushDateFares = defineEndpoint({
  api: API,
  group: cacheFlushDateFaresGroup,
  functionName: "fetchCacheFlushDateFares",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Returns the timestamp of when any static endpoint data for the wsf-fares API was last updated.",
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateFaresInput = CacheFlushDateInput;
export type CacheFlushDateFares = CacheFlushDateOutput;
