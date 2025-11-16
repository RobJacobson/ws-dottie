import { apis } from "@/apis/shared/apis";
import {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "@/apis/shared/cacheFlushDate";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";

export const cacheFlushDateScheduleGroup: EndpointGroup = {
  name: "cache-flush-date-schedule",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Cache invalidation timestamp for wsf-schedule static data.",
    description:
      "Timestamp indicating when static endpoint data for the wsf-schedule API was last updated. Use to determine when to invalidate cached schedule information.",
    useCases: [
      "Poll periodically to detect when static schedule data has changed.",
      "Invalidate application cache when timestamp changes.",
      "Optimize cache refresh strategy for schedule endpoints.",
    ],
    updateFrequency: "on-change",
  },
};

export const fetchCacheFlushDateSchedule = createEndpoint({
  api: apis.wsfSchedule,
  group: cacheFlushDateScheduleGroup,
  functionName: "fetchCacheFlushDateSchedule",
  endpoint: "/cacheflushdate",
  inputSchema: cacheFlushDateInputSchema,
  outputSchema: cacheFlushDateOutputSchema,
  sampleParams: {},
  endpointDescription:
    "Get timestamp of when static wsf-schedule data was last updated.",
});

// Re-export with API-specific names for backward compatibility
export type CacheFlushDateScheduleInput = CacheFlushDateInput;
export type CacheFlushDateSchedules = CacheFlushDateOutput;
