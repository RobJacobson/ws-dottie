import { getActiveSeasonsMeta } from "./activeSeasons";
import { getAllSailingsMeta } from "./allSailings";
import { getScheduleCacheFlushDateMeta } from "./cacheFlushDate";
import { getRouteDetailsMeta } from "./routeDetails";
import { getRouteDetailsByRouteMeta } from "./routeDetailsByRoute";
import { getRouteDetailsByTerminalsMeta } from "./routeDetailsByTerminals";
import { getRoutesMeta } from "./routes";
import { getRoutesByTerminalsMeta } from "./routesByTerminals";
import { getRoutesHavingServiceDisruptionsMeta } from "./routesHavingServiceDisruptions";
import { getRoutesWithDisruptionsMeta } from "./routesWithDisruptions";
import { getSailingsMeta } from "./sailings";
import { getScheduleAlertsMeta } from "./scheduleAlerts";
import { getScheduleByRouteMeta } from "./scheduleByRoute";
import { getScheduleByTerminalsMeta } from "./scheduleByTerminals";
import { getScheduledRoutesMeta } from "./scheduledRoutes";
import { getScheduledRoutesBySeasonMeta } from "./scheduledRoutesBySeason";
import { getScheduleTodayByRouteMeta } from "./scheduleTodayByRoute";
import { getScheduleTodayByScheduleTerminalsMeta } from "./scheduleTodayByTerminals";
import { getScheduleValidDateRangeMeta } from "./scheduleValidDateRange";
import { getTerminalMatesMeta } from "./terminalMates";
import { getScheduleTerminalsMeta } from "./terminals";
import { getTerminalsAndMatesMeta } from "./terminalsAndMates";
import { getTerminalsAndMatesByRouteMeta } from "./terminalsAndMatesByRoute";
import { getTimeAdjustmentsMeta } from "./timeAdjustments";
import { getTimeAdjustmentsByRouteMeta } from "./timeAdjustmentsByRoute";
import { defineEndpoint } from "@/shared/endpoints";

export const activeSeasons = defineEndpoint(getActiveSeasonsMeta);
export const allSailings = defineEndpoint(getAllSailingsMeta);
export const getScheduleCacheFlushDate = defineEndpoint(
  getScheduleCacheFlushDateMeta
);
export const routeDetails = defineEndpoint(getRouteDetailsMeta);
export const routeDetailsByRoute = defineEndpoint(getRouteDetailsByRouteMeta);
export const routeDetailsByTerminals = defineEndpoint(
  getRouteDetailsByTerminalsMeta
);
export const routes = defineEndpoint(getRoutesMeta);
export const routesByTerminals = defineEndpoint(getRoutesByTerminalsMeta);
export const routesHavingServiceDisruptions = defineEndpoint(
  getRoutesHavingServiceDisruptionsMeta
);
export const routesWithDisruptions = defineEndpoint(
  getRoutesWithDisruptionsMeta
);
export const sailings = defineEndpoint(getSailingsMeta);
export const scheduleAlerts = defineEndpoint(getScheduleAlertsMeta);
export const scheduleByRoute = defineEndpoint(getScheduleByRouteMeta);
export const scheduleByTerminals = defineEndpoint(getScheduleByTerminalsMeta);
export const scheduleTodayByRoute = defineEndpoint(getScheduleTodayByRouteMeta);
export const scheduleTodayByTerminals = defineEndpoint(
  getScheduleTodayByScheduleTerminalsMeta
);
export const scheduleValidDateRange = defineEndpoint(
  getScheduleValidDateRangeMeta
);
export const scheduledRoutes = defineEndpoint(getScheduledRoutesMeta);
export const scheduledRoutesBySeason = defineEndpoint(
  getScheduledRoutesBySeasonMeta
);
export const terminalMates = defineEndpoint(getTerminalMatesMeta);
export const terminals = defineEndpoint(getScheduleTerminalsMeta);
export const terminalsAndMates = defineEndpoint(getTerminalsAndMatesMeta);
export const terminalsAndMatesByRoute = defineEndpoint(
  getTerminalsAndMatesByRouteMeta
);
export const timeAdjustments = defineEndpoint(getTimeAdjustmentsMeta);
export const timeAdjustmentsByRoute = defineEndpoint(
  getTimeAdjustmentsByRouteMeta
);

// Re-export input types from client files
export type { ActiveSeasonsInput } from "./activeSeasons";
export type { AllSailingsInput } from "./allSailings";
export type { ScheduleCacheFlushDateInput } from "./cacheFlushDate";
export type { RouteDetailsListInput } from "./routeDetails";
export type { RouteDetailsByRouteInput } from "./routeDetailsByRoute";
export type { RouteDetailsByTerminalsInput } from "./routeDetailsByTerminals";
export type { RoutesInput } from "./routes";
export type { RoutesByTerminalsInput } from "./routesByTerminals";
export type { RoutesHavingServiceDisruptionsInput } from "./routesHavingServiceDisruptions";
export type { RoutesWithDisruptionsInput } from "./routesWithDisruptions";
export type { SailingsInput } from "./sailings";
export type { ScheduleAlertsInput } from "./scheduleAlerts";
export type { ScheduleByRouteInput } from "./scheduleByRoute";
export type { ScheduleByTerminalsInput } from "./scheduleByTerminals";
export type { ScheduledRoutesInput } from "./scheduledRoutes";
export type { ScheduledRoutesBySeasonInput } from "./scheduledRoutesBySeason";
export type { ScheduleTodayByRouteInput } from "./scheduleTodayByRoute";
export type { ScheduleTodayByScheduleTerminalsInput } from "./scheduleTodayByTerminals";
export type { ScheduleValidDateRangeInput } from "./scheduleValidDateRange";
export type { TerminalMatesInput } from "./terminalMates";
export type { ScheduleTerminalsInput } from "./terminals";
export type { TerminalsAndMatesInput } from "./terminalsAndMates";
export type { TerminalsAndMatesByRouteInput } from "./terminalsAndMatesByRoute";
export type { TimeAdjustmentsInput } from "./timeAdjustments";
export type { TimeAdjustmentsByRouteInput } from "./timeAdjustmentsByRoute";
