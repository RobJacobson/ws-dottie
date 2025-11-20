import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchScheduleByTripDateAndRouteId: FetchFactory<
  ScheduleByTripDateAndRouteIdInput,
  Schedule
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleByTripDateAndRouteIdMeta,
});

/**
 * React Query hook for retrieving sailing schedule for a specific route and trip date
 */
export const useScheduleByTripDateAndRouteId: HookFactory<
  ScheduleByTripDateAndRouteIdInput,
  Schedule
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduleByTripDateAndRouteIdMeta.functionName,
  fetchFn: fetchScheduleByTripDateAndRouteId,
  cacheStrategy: schedulesGroup.cacheStrategy,
});
