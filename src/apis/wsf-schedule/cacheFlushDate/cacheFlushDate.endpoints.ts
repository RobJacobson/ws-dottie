import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cacheFlushDate.input";
import * as o from "./cacheFlushDate.output";

const DESCRIPTION =
  "Cache flush date indicates when schedule data was last updated, helping clients determine if they need to refresh their cached schedule information.";

export const scheduleCacheFlushDateResource: EndpointGroup = {
  name: "schedule-cache-flush-date",
  documentation: {
    resourceDescription:
      "Each ScheduleCacheFlushDate item represents last update timestamp for schedule data. This timestamp indicates when ferry schedule information was last refreshed in system.",
    businessContext:
      "Use to determine data freshness by providing last update timestamp for schedule cache management and data synchronization.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    get: {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns single of ScheduleCacheFlushDate for data freshness.`,
    } satisfies EndpointDefinition<
      i.ScheduleValidDateRangeInput,
      o.SchedulesCacheFlushDate
    >,
  },
};
