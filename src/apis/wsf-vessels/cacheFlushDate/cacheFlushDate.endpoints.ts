import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type CacheFlushDateVesselsInput,
  cacheFlushDateVesselsInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateVessels,
  cacheFlushDateVesselsSchema,
} from "./cacheFlushDate.output";

export const cacheFlushDateVesselsResource = {
  name: "cache-flush-date-vessels",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-vessels API was last updated. This information helps applications determine when to refresh cached vessels information through cache invalidation.",

    businessContext:
      "Many wsf-vessels endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-vessels data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getCacheFlushDateVessels: {
      function: "getCacheFlushDateVessels",
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateVesselsInputSchema,
      outputSchema: cacheFlushDateVesselsSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description:
        "Returns the timestamp of when any static endpoint data for the wsf-vessels API was last updated.",
    } satisfies EndpointDefinition<
      CacheFlushDateVesselsInput,
      CacheFlushDateVessels
    >,
  },
} satisfies EndpointGroup;
