import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfTerminalsApi } from "../apiDefinition";

export const cacheFlushDateTerminalsGroup = defineEndpointGroup({
  name: "cache-flush-date-terminals",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-terminals API was last updated. This information helps applications determine when to refresh cached terminals information through cache invalidation.",
    businessContext:
      "Many wsf-terminals endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-terminals data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
});

export const fetchCacheFlushDateTerminals = defineEndpoint({
  apiName: wsfTerminalsApi.name,
  baseUrl: wsfTerminalsApi.baseUrl,
  group: cacheFlushDateTerminalsGroup,
  functionName: "fetchCacheFlushDateTerminals",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Returns the timestamp of when any static endpoint data for the wsf-terminals API was last updated.",
});


// Re-export with API-specific names for backward compatibility
export type CacheFlushDateTerminalsInput = CacheFlushDateInput;
export type CacheFlushDateTerminals = CacheFlushDateOutput;
