import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleValidDateRangeResource
);

export const fetchScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchScheduleValidDateRange;
