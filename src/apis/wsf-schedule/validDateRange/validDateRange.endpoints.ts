import { apis } from "@/apis/shared/apis";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { scheduleValidDateRangeInputSchema } from "./validDateRange.input";

export const scheduleValidDateRangeGroup: EndpointGroup = {
  name: "schedule-valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item specifies the period for which schedule data is available and valid, helping clients understand the coverage of schedule information.",
    businessContext:
      "Use to determine schedule data availability by providing date range information for planning ferry travel.",
  },
};

export const fetchScheduleValidDateRange = defineEndpoint({
  api: apis.wsfSchedule,
  group: scheduleValidDateRangeGroup,
  functionName: "fetchScheduleValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: scheduleValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription: "Returns single of ValidDateRange for schedule data.",
});
