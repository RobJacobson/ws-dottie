import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for schedule by trip date and route ID
 */
const scheduleByTripDateAndRouteIdFactory = createFetchAndHook<
  ScheduleByTripDateAndRouteIdInput,
  Schedule
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleByTripDateAndRouteIdMeta,
  getEndpointGroup: () =>
    require("./shared/schedules.endpoints").schedulesGroup,
});

/**
 * Fetch function and React Query hook for retrieving sailing schedule for a specific route and trip date
 */
export const {
  fetch: fetchScheduleByTripDateAndRouteId,
  hook: useScheduleByTripDateAndRouteId,
} = scheduleByTripDateAndRouteIdFactory;
