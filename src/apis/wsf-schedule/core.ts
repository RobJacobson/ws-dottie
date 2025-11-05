/**
 * @fileoverview WSF Schedule API - Core Functions
 *
 * This module provides strongly-typed functions for WSF Schedule API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { ActiveSeasonsInput } from "./activeSeasons/activeSeasons.input";
import type { ActiveSeason } from "./activeSeasons/activeSeasons.output";
import type { ScheduleCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
import type { ScheduleCacheFlushDateResponse } from "./cacheFlushDate/cacheFlushDate.output";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails/routeDetails.input";
import type { RouteDetail } from "./routeDetails/routeDetails.output";
import type { ScheduleAlertsInput } from "./scheduleAlerts/scheduleAlerts.input";
import type { ScheduleAlert } from "./scheduleAlerts/scheduleAlerts.output";
import type { ScheduledRoutesInput } from "./scheduledRoutes/scheduledRoutes.input";
import type { ScheduledRoute } from "./scheduledRoutes/scheduledRoutes.output";
import type {
  ScheduleTodayByRouteInput,
  ScheduleTodayByTerminalsInput,
} from "./scheduleToday/scheduleToday.input";
import type { ScheduleToday } from "./scheduleToday/scheduleToday.output";
import type { ServiceDisruptionsInput } from "./serviceDisruptions/serviceDisruptions.input";
import type { ServiceDisruption } from "./serviceDisruptions/serviceDisruptions.output";
import type { TerminalMatesInput } from "./terminalMates/terminalMates.input";
import type { TerminalMate } from "./terminalMates/terminalMates.output";
import type { TerminalsInput } from "./terminals/terminals.input";
import type { Terminal } from "./terminals/terminals.output";
import type {
  TimeAdjByRouteInput,
  TimeAdjBySchedRouteInput,
  TimeAdjustmentsInput,
} from "./timeAdjustments/timeAdjustments.input";
import type { TimeAdjustment } from "./timeAdjustments/timeAdjustments.output";
import type { ValidDateRangeInput } from "./validDateRange/validDateRange.input";
import type { ValidDateRangeResponse } from "./validDateRange/validDateRange.output";

// Create strongly-typed functions using the factory
export const getScheduleByTripDateAndRouteId = createApiFunction<
  ScheduleByRouteInput,
  Schedule
>("wsf-schedule:getScheduleByTripDateAndRouteId");
export const getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  createApiFunction<ScheduleByTerminalComboInput, Schedule>(
    "wsf-schedule:getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds"
  );
export const getRoutesByTripDate = createApiFunction<RoutesInput, Route[]>(
  "wsf-schedule:getRoutesByTripDate"
);
export const getRoutesByTripDateAndTerminals = createApiFunction<
  RoutesByTerminalsInput,
  Route[]
>("wsf-schedule:getRoutesByTripDateAndTerminals");
export const getAllSailingsBySchedRouteID = createApiFunction<
  AllSchedSailingsBySchedRouteInput,
  Sailing[]
>("wsf-schedule:getAllSailingsBySchedRouteID");
export const getSailingsByRouteID = createApiFunction<
  SailingsByRouteIdInput,
  Sailing[]
>("wsf-schedule:getSailingsByRouteID");
export const getActiveSeasons = createApiFunction<
  ActiveSeasonsInput,
  ActiveSeason[]
>("wsf-schedule:getActiveSeasons");
export const getRouteDetailsByTripDate = createApiFunction<
  RouteDetailsByTripDateInput,
  RouteDetail[]
>("wsf-schedule:getRouteDetailsByTripDate");
export const getRouteDetailsByTripDateAndRouteId = createApiFunction<
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail[]
>("wsf-schedule:getRouteDetailsByTripDateAndRouteId");
export const getRouteDetailsByTripDateAndTerminals = createApiFunction<
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetail[]
>("wsf-schedule:getRouteDetailsByTripDateAndTerminals");
export const getScheduledRoutes = createApiFunction<
  ScheduledRoutesInput,
  ScheduledRoute[]
>("wsf-schedule:getScheduledRoutes");
export const getScheduleAlerts = createApiFunction<
  ScheduleAlertsInput,
  ScheduleAlert[]
>("wsf-schedule:getScheduleAlerts");
export const getScheduleTodayByRoute = createApiFunction<
  ScheduleTodayByRouteInput,
  ScheduleToday[]
>("wsf-schedule:getScheduleTodayByRoute");
export const getScheduleTodayByTerminals = createApiFunction<
  ScheduleTodayByTerminalsInput,
  ScheduleToday[]
>("wsf-schedule:getScheduleTodayByTerminals");
export const getRoutesHavingServiceDisruptionsByTripDate = createApiFunction<
  ServiceDisruptionsInput,
  ServiceDisruption[]
>("wsf-schedule:getRoutesHavingServiceDisruptionsByTripDate");
export const getTimeAdjustments = createApiFunction<
  TimeAdjustmentsInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustments");
export const getTimeAdjustmentsByRoute = createApiFunction<
  TimeAdjByRouteInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustmentsByRoute");
export const getTimeAdjustmentsBySchedRoute = createApiFunction<
  TimeAdjBySchedRouteInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustmentsBySchedRoute");
export const getTerminalMates = createApiFunction<
  TerminalMatesInput,
  TerminalMate[]
>("wsf-schedule:getTerminalMates");
export const getTerminals = createApiFunction<TerminalsInput, Terminal[]>(
  "wsf-schedule:getTerminals"
);
export const getScheduleValidDateRange = createApiFunction<
  ValidDateRangeInput,
  ValidDateRangeResponse
>("wsf-schedule:getScheduleValidDateRange");
export const getScheduleCacheFlushDate = createApiFunction<
  ScheduleCacheFlushDateInput,
  ScheduleCacheFlushDateResponse
>("wsf-schedule:getScheduleCacheFlushDate");
