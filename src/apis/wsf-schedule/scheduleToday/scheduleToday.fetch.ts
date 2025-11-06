import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTodayResource } from "./scheduleToday.endpoints";
import type {
  ScheduleTodayByRouteInput,
  ScheduleTodayByTerminalsInput,
} from "./scheduleToday.input";
import type { Schedule } from "./scheduleToday.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleTodayResource
);

export const fetchScheduleTodayByRoute =
  fetchFunctions.fetchScheduleTodayByRoute as (
    params?: FetchFunctionParams<ScheduleTodayByRouteInput>
  ) => Promise<Schedule>;

export const fetchScheduleTodayByTerminals =
  fetchFunctions.fetchScheduleTodayByTerminals as (
    params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>
  ) => Promise<Schedule>;
