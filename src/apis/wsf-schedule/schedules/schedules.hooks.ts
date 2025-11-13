import {
  fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  fetchScheduleByTripDateAndRouteId,
} from "./schedules.endpoints";

export const useScheduleByTripDateAndRouteId =
  fetchScheduleByTripDateAndRouteId.useQuery;

export const useScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds.useQuery;
