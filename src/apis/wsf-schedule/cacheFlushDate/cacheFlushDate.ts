import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./cacheFlushDate.input";
import * as o from "./cacheFlushDate.output";

const DESCRIPTION =
  "Cache flush date indicates when the schedule data was last updated, helping clients determine if they need to refresh their cached schedule information.";

export const scheduleCacheFlushDateResource: EndpointGroup = {
  name: "schedule-cache-flush-date",
  documentation: {
    resourceDescription: DESCRIPTION,
    businessContext: "",
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
      description: `Returns the cache flush date for schedule data. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.ScheduleValidDateRangeInput,
      o.SchedulesCacheFlushDate
    >,
  },
};
