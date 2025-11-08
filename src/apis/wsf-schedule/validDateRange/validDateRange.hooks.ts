import type { UseQueryResult } from "@tanstack/react-query";
import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import * as fetchFunctions from "./validDateRange.fetch";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleValidDateRangeResource,
  fetchFunctions
);

export const useScheduleValidDateRange: (
  params?: ScheduleValidDateRangeInput,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error> = hooks.useScheduleValidDateRange;
