import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type CacheFlushDateFaresInput,
  cacheFlushDateFaresInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateFares,
  cacheFlushDateFaresSchema,
} from "./cacheFlushDate.output";

export const cacheFlushDateFaresGroup = {
  name: "cache-flush-date-fares",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-fares API was last updated. This information helps applications determine when to refresh cached fare information through cache invalidation.",

    businessContext:
      "Many wsf-fares endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-fares data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCacheFlushDateFares: {
      function: "getCacheFlushDateFares",
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateFaresInputSchema,
      outputSchema: cacheFlushDateFaresSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "Returns the timestamp of when any static endpoint data for the wsf-fares API was last updated.",
    } satisfies EndpointDefinition<
      CacheFlushDateFaresInput,
      CacheFlushDateFares
    >,
  },
} satisfies EndpointGroup;
