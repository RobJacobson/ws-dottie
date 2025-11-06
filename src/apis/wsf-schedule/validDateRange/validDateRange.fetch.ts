import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";
import type { ValidDateRange } from "./validDateRange.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleValidDateRangeResource
);

export const fetchScheduleValidDateRange =
  fetchFunctions.fetchScheduleValidDateRange as (
    params?: FetchFunctionParams<ScheduleValidDateRangeInput>
  ) => Promise<ValidDateRange>;
