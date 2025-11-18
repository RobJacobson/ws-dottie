import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>
) => Promise<ValidDateRange> = createFetchFunction(
  apis.wsfSchedule,
  scheduleValidDateRangeGroup,
  scheduleValidDateRangeMeta
);

/**
 * React Query hook for retrieving the valid date range for schedule data
 */
export const useScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error> = createHook(
  apis.wsfSchedule,
  scheduleValidDateRangeGroup,
  scheduleValidDateRangeMeta
);
