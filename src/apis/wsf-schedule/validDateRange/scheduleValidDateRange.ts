import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import { scheduleValidDateRangeGroup } from "./shared/validDateRange.endpoints";
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
 * Fetch function for retrieving the valid date range for schedule data
 */
export const fetchScheduleValidDateRange: FetchFactory<
  ScheduleValidDateRangeInput,
  ValidDateRange
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleValidDateRangeMeta,
});

/**
 * React Query hook for retrieving the valid date range for schedule data
 */
export const useScheduleValidDateRange: HookFactory<
  ScheduleValidDateRangeInput,
  ValidDateRange
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduleValidDateRangeMeta.functionName,
  fetchFn: fetchScheduleValidDateRange,
  cacheStrategy: scheduleValidDateRangeGroup.cacheStrategy,
});
