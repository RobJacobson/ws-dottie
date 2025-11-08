import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/apis/shared/validDateRange.output";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import {
  type ScheduleValidDateRangeInput,
  scheduleValidDateRangeInputSchema,
} from "./validDateRange.input";

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
    fetchScheduleValidDateRange: {
      endpoint: "/validdaterange",
      inputSchema: scheduleValidDateRangeInputSchema,
      outputSchema: validDateRangeSchema,
      sampleParams: {},
      endpointDescription:
        "Returns single of ValidDateRange for schedule data.",
    } satisfies EndpointDefinition<ScheduleValidDateRangeInput, ValidDateRange>,
  },
} satisfies EndpointGroup;
