import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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

export const fetchScheduleTodayByRoute: (
  params?: FetchFunctionParams<ScheduleTodayByRouteInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleTodayByRoute;

export const fetchScheduleTodayByTerminals: (
  params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleTodayByTerminals;
