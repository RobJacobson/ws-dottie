import type { EndpointDefinition } from "@/apis/types";
import * as i from "./validDateRange.input";
import * as o from "./validDateRange.output";

export const scheduleValidDateRangeResource = {
  name: "schedule-valid-date-range",
  resourceDescription:
    "Valid date range specifies the period for which schedule data is available and valid, helping clients understand the coverage of schedule information.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getScheduleValidDateRange: {
      function: "getScheduleValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeSchema,
      sampleParams: {},
      endpointDescription: "Returns the valid date range for schedule data.",
    } satisfies EndpointDefinition<
      i.ScheduleValidDateRangeInput,
      o.ValidDateRange
    >,
  },
};
