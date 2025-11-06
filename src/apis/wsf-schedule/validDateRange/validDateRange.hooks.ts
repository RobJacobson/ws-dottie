import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import * as fetchFunctions from "./validDateRange.fetch";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";
import type { ValidDateRange } from "./validDateRange.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleValidDateRangeResource,
  fetchFunctions
);

export const useScheduleValidDateRange = hooks.useScheduleValidDateRange as (
  params?: ScheduleValidDateRangeInput,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error>;
