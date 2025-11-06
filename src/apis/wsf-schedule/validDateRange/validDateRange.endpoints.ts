import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./validDateRange.input";
import * as o from "./validDateRange.output";

export const scheduleValidDateRangeResource = {
  name: "schedule-valid-date-range",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item specifies the period for which schedule data is available and valid, helping clients understand the coverage of schedule information.",
    businessContext:
      "Use to determine schedule data availability by providing date range information for planning ferry travel.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleValidDateRange: {
      function: "getScheduleValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeSchema,
      sampleParams: {},
      endpointDescription:
        "Returns single of ValidDateRange for schedule data.",
    } satisfies EndpointDefinition<
      i.ScheduleValidDateRangeInput,
      o.ValidDateRange
    >,
  },
} satisfies EndpointGroup;
