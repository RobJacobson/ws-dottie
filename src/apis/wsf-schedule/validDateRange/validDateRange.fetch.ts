import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleValidDateRangeResource } from "./validDateRange.endpoints";
import type { ScheduleValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleValidDateRangeResource
);

export const fetchScheduleValidDateRange: (
  params?: FetchFunctionParams<ScheduleValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchScheduleValidDateRange;
