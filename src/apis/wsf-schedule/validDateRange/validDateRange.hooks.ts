import type { UseQueryResult } from "@tanstack/react-query";
import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import * as fetchFunctions from "./validDateRange.fetch";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";

const hooks = createHooks(
  wsfScheduleApi,
  scheduleValidDateRangeResource,
  fetchFunctions
);

export const useScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error> = hooks.useScheduleValidDateRange;
