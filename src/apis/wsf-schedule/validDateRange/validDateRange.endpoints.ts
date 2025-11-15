import { apis } from "@/apis/shared/apis";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { scheduleValidDateRangeInputSchema } from "./validDateRange.input";

export const scheduleValidDateRangeGroup: EndpointGroup = {
  name: "schedule-valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Validity period for published WSF schedule data.",
    description:
      "Returns the start and end dates between which schedule information is accurate and available for all ferry routes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine valid trip dates for schedule queries.",
      "Validate trip date inputs before calling other endpoints.",
      "Display available date ranges in booking interfaces.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchScheduleValidDateRange = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduleValidDateRangeGroup,
  functionName: "fetchScheduleValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: scheduleValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription: "Get the valid date range for schedule data.",
});
