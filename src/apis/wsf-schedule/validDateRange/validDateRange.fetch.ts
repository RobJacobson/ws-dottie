import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleValidDateRangeResource
);

export const fetchScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchScheduleValidDateRange;
