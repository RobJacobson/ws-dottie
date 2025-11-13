import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeInputSchema } from "./validDateRange.input";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "schedule-valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item specifies the period for which schedule data is available and valid, helping clients understand the coverage of schedule information.",
    businessContext:
      "Use to determine schedule data availability by providing date range information for planning ferry travel.",
  },
});

export const fetchScheduleValidDateRange = defineEndpoint({
  group,
  functionName: "fetchScheduleValidDateRange",
  definition: {
    endpoint: "/validdaterange",
    inputSchema: scheduleValidDateRangeInputSchema,
    outputSchema: validDateRangeSchema,
    sampleParams: {},
    endpointDescription: "Returns single of ValidDateRange for schedule data.",
  },
});

export const scheduleValidDateRangeResource = group.descriptor;
