import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type CacheFlushDateScheduleInput,
  cacheFlushDateScheduleInputSchema,
} from "./cacheFlushDate.input";
import {
  type CacheFlushDateSchedules,
  cacheFlushDateScheduleSchema,
} from "./cacheFlushDate.output";

export const cacheFlushDateSchedule = {
  name: "cache-flush-date-schedule",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-schedule API was last updated. This information helps applications determine when to refresh cached fare information through cache invalidation.",

    businessContext:
      "Many wsf-schedule endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-schedule data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchCacheFlushDateSchedule: {
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateScheduleInputSchema,
      outputSchema: cacheFlushDateScheduleSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns the timestamp of when any static endpoint data for the wsf-schedule API was last updated.`,
    } satisfies EndpointDefinition<
      CacheFlushDateScheduleInput,
      CacheFlushDateSchedules
    >,
  },
} satisfies EndpointGroup;
