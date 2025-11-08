import type { UseQueryResult } from "@tanstack/react-query";
import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
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
