import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { schedulesGroup } from "./shared/schedules.endpoints";
import {
  type ScheduleByTripDateAndRouteIdInput,
  scheduleByTripDateAndRouteIdInputSchema,
} from "./shared/schedules.input";
import { type Schedule, scheduleSchema } from "./shared/schedules.output";

/**
 * Metadata for the fetchScheduleByTripDateAndRouteId endpoint
 */
export const scheduleByTripDateAndRouteIdMeta = {
  functionName: "fetchScheduleByTripDateAndRouteId",
  endpoint: "/schedule/{TripDate}/{RouteID}",
  inputSchema: scheduleByTripDateAndRouteIdInputSchema,
  outputSchema: scheduleSchema,
  sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
  endpointDescription:
    "Get sailing schedule for a specific route and trip date.",
} satisfies EndpointMeta<ScheduleByTripDateAndRouteIdInput, Schedule>;

/**
 * Fetch function for retrieving sailing schedule for a specific route and trip date
 */
export const fetchScheduleByTripDateAndRouteId: (
  params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>
) => Promise<Schedule> = createFetchFunction(
  wsfScheduleApi.api,
  schedulesGroup,
  scheduleByTripDateAndRouteIdMeta
);

/**
 * React Query hook for retrieving sailing schedule for a specific route and trip date
 */
export const useScheduleByTripDateAndRouteId: (
  params?: FetchFunctionParams<ScheduleByTripDateAndRouteIdInput>,
  options?: QueryHookOptions<Schedule>
) => UseQueryResult<Schedule, Error> = createHook(
  wsfScheduleApi.api,
  schedulesGroup,
  scheduleByTripDateAndRouteIdMeta
);
