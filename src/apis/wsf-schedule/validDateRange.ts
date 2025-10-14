import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Valid date range specifies the period for which schedule data is available and valid, helping clients understand the coverage of schedule information.";

export const scheduleValidDateRangeResource = {
  name: "schedule-valid-date-range",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    get: {
      function: "getScheduleValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns the valid date range for schedule data. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.ScheduleValidDateRangeInput,
      o.ValidDateRange
    >,
  },
};
