import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "cache-flush-date-schedule",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Represents the timestamp of when any static endpoint data for the wsf-schedule API was last updated. This information helps applications determine when to refresh cached schedules information through cache invalidation.",
    businessContext:
      "Many wsf-schedule endpoints return data that changes infrequently. As a result, you may wish to cache it in your application. Poll this endpoint periodically to detect when static wsf-schedule data has changed. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service. Polled automatically by the ws-dottie useQuery hooks to invalidate cache.",
  },
});

export const fetchCacheFlushDateSchedule = defineEndpoint({
  group,
  functionName: "fetchCacheFlushDateSchedule",
  definition: {
    endpoint: "/cacheflushdate",
    inputSchema: cacheFlushDateInputSchema,
    outputSchema: cacheFlushDateOutputSchema,
    sampleParams: {},
    endpointDescription:
      "Returns the timestamp of when any static endpoint data for the wsf-schedule API was last updated.",
  },
});

export const cacheFlushDateSchedule = group.descriptor;

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateScheduleInput = CacheFlushDateInput;
export type CacheFlushDateSchedules = CacheFlushDateOutput;
