import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";
import type { ValidDateRange } from "./validDateRange.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleValidDateRangeResource
);

export const fetchScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchScheduleValidDateRange;
