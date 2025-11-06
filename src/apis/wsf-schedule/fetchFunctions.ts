import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsfScheduleApi } from "./apiDefinition";

export const {
  fetchActiveSeasons,
  fetchCacheFlushDate,
  fetchRouteDetailsByTripDate,
  fetchRouteDetailsByTripDateAndRouteId,
  fetchRouteDetailsByTripDateAndTerminals,
  fetchRoutesByTripDate,
  fetchRoutesByTripDateAndTerminals,
  fetchSailingsBySchedRouteID,
  fetchScheduleAlerts,
  fetchScheduledRoutes,
  fetchScheduledRoutesById,
  fetchScheduleByTripDateAndRouteId,
  fetchScheduleByTripDateAndDepartingTerminalIdAndTerminalIds,
  fetchScheduleTodayByRoute,
  fetchScheduleTodayByTerminals,
  fetchRoutesHavingServiceDisruptionsByTripDate,
  fetchTerminalMates,
  fetchTerminals,
  fetchTerminalsAndMates,
  fetchTerminalsAndMatesByRoute,
  fetchTimeAdjustments,
  fetchTimeAdjustmentsByRoute,
  fetchTimeAdjustmentsBySchedRoute,
  fetchScheduleValidDateRange,
} = createFetchFunctions(wsfScheduleApi);
