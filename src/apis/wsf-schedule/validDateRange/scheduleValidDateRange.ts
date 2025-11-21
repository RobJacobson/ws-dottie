import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleValidDateRangeInput,
  scheduleValidDateRangeInputSchema,
} from "./shared/validDateRange.input";

/**
 * Metadata for the fetchScheduleValidDateRange endpoint
 */
export const scheduleValidDateRangeMeta = {
  functionName: "fetchScheduleValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: scheduleValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription: "Get the valid date range for schedule data.",
} satisfies EndpointMeta<ScheduleValidDateRangeInput, ValidDateRange>;

/**
 * Factory result for schedule valid date range
 */
const scheduleValidDateRangeFactory = createFetchAndHook<
  ScheduleValidDateRangeInput,
  ValidDateRange
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleValidDateRangeMeta,
  getEndpointGroup: () =>
    require("./shared/validDateRange.endpoints").scheduleValidDateRangeGroup,
});

/**
 * Fetch function and React Query hook for retrieving the valid date range for schedule data
 */
export const {
  fetch: fetchScheduleValidDateRange,
  hook: useScheduleValidDateRange,
} = scheduleValidDateRangeFactory;
