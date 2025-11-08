import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleTodayResource } from "./scheduleToday.endpoints";
import type {
  ScheduleTodayByRouteInput,
  ScheduleTodayByTerminalsInput,
} from "./scheduleToday.input";
import type { Schedule } from "./scheduleToday.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleTodayResource
);

export const fetchScheduleTodayByRoute: (
  params?: FetchFunctionParams<ScheduleTodayByRouteInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleTodayByRoute;

export const fetchScheduleTodayByTerminals: (
  params?: FetchFunctionParams<ScheduleTodayByTerminalsInput>
) => Promise<Schedule> = fetchFunctions.fetchScheduleTodayByTerminals;
