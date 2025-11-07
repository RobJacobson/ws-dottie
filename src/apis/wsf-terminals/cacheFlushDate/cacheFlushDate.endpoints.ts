import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type CacheFlushDateTerminalsInput,
  cacheFlushDateTerminalsInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateTerminals,
  cacheFlushDateTerminalsSchema,
} from "./cacheFlushDate.output";

export const cacheFlushDateTerminalsResource = {
  name: "cache-flush-date-terminals",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-terminals API was last updated. This information helps applications determine when to refresh cached terminals information through cache invalidation.",

    businessContext:
      "Many wsf-terminals endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-terminals data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCacheFlushDate: {
      function: "getCacheFlushDateTerminals",
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateTerminalsInputSchema,
      outputSchema: cacheFlushDateTerminalsSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description:
        "Returns the timestamp of when any static endpoint data for the wsf-terminals API was last updated.",
    } satisfies EndpointDefinition<
      CacheFlushDateTerminalsInput,
      CacheFlushDateTerminals
    >,
  },
} satisfies EndpointGroup;
