import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { CacheFlushDateInput } from "./cacheFlushDate.input";
import { cacheFlushDateInputSchema } from "./cacheFlushDate.input";
import type { SchedulesCacheFlushDate } from "./cacheFlushDate.output";
import { cacheFlushDateSchema } from "./cacheFlushDate.output";

const DESCRIPTION =
  "Cache flush date indicates when schedule data was last updated, helping clients determine if they need to refresh their cached schedule information.";

export const scheduleCacheFlushDateResource = {
  name: "schedule-cache-flush-date",
  documentation: {
    resourceDescription:
      "Each ScheduleCacheFlushDate item represents last update timestamp for schedule data. This timestamp indicates when ferry schedule information was last refreshed in system.",
    businessContext:
      "Use to determine data freshness by providing last update timestamp for schedule cache management and data synchronization.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    get: {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: cacheFlushDateInputSchema,
      outputSchema: cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns single of ScheduleCacheFlushDate for data freshness.`,
    } satisfies EndpointDefinition<
      CacheFlushDateInput,
      SchedulesCacheFlushDate
    >,
  },
} satisfies EndpointGroup;
