/**
 * @fileoverview WSF Schedule API - Core Functions
 *
 * This module provides strongly-typed functions for WSF Schedule API
 * that use the factory function with proper TypeScript types.
 */

import { createApiFunction } from "@/shared/utils/apiFunctionFactory";
import type { ActiveScheduledSeasonsInput } from "./activeSeasons/activeSeasons.input";
import type { ActiveSeason } from "./activeSeasons/activeSeasons.output";
import type { SchedulesCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
import type { SchedulesCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
import type {
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetailsByTripDateAndTerminalsInput,
  RouteDetailsByTripDateInput,
} from "./routeDetails/routeDetails.input";
import type { RouteDetail } from "./routeDetails/routeDetails.output";
import type { AllAlertsInput } from "./scheduleAlerts/scheduleAlerts.input";
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
  RouteDetailsByTripDateAndRouteIdInput,
  RouteDetail
>("wsf-schedule:getScheduleByTripDateAndRouteId");
export const getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds =
  createApiFunction<RouteDetailsByTripDateAndTerminalsInput, RouteDetail>(
    "wsf-schedule:getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds"
  );
export const getRoutesByTripDate = createApiFunction<
  TerminalsInput,
  Terminal[]
>("wsf-schedule:getRoutesByTripDate");
export const getRoutesByTripDateAndTerminals = createApiFunction<
  TerminalsInput,
  Terminal[]
>("wsf-schedule:getRoutesByTripDateAndTerminals");
export const getAllSailingsBySchedRouteID = createApiFunction<
  ScheduledRoutesByScheduleIdInput,
  ScheduledRoute[]
>("wsf-schedule:getAllSailingsBySchedRouteID");
export const getSailingsByRouteID = createApiFunction<
  { RouteID: number },
  ScheduledRoute[]
>("wsf-schedule:getSailingsByRouteID");
export const getActiveSeasons = createApiFunction<
  ActiveScheduledSeasonsInput,
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
  AllAlertsInput,
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
export const getTerminalMates = createApiFunction<
  TerminalMatesInput,
  TerminalMate[]
>("wsf-schedule:getTerminalMates");
export const getTerminals = createApiFunction<TerminalsInput, Terminal[]>(
  "wsf-schedule:getTerminals"
);
export const getTimeAdjustmentsByRoute = createApiFunction<
  TimeAdjByRouteInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustmentsByRoute");
export const getTimeAdjustmentsBySchedRoute = createApiFunction<
  TimeAdjBySchedRouteInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustmentsBySchedRoute");
export const getTimeAdjustments = createApiFunction<
  TimeAdjustmentsInput,
  TimeAdjustment[]
>("wsf-schedule:getTimeAdjustments");
export const getValidDateRange = createApiFunction<
  ValidDateRangeInput,
  ValidDateRangeResponse
>("wsf-schedule:getValidDateRange");
export const getSchedulesCacheFlushDate = createApiFunction<
  SchedulesCacheFlushDateInput,
  SchedulesCacheFlushDate
>("wsf-schedule:getSchedulesCacheFlushDate");
