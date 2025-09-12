export * from "./activeSeasons";
export * from "./scheduleAlerts";
export * from "./allSailings";
export * from "./cacheFlushDate";
export * from "./routeDetails";
export * from "./routeDetailsByRoute";
export * from "./routeDetailsByTerminals";
export * from "./routes";
export * from "./routesByTerminals";
export * from "./routesHavingServiceDisruptions";
export * from "./routesWithDisruptions";
export * from "./sailings";
export * from "./scheduleByRoute";
export * from "./scheduleByTerminals";
export * from "./scheduledRoutes";
export * from "./scheduledRoutesBySeason";
export * from "./scheduleTodayByRoute";
export * from "./scheduleTodayByTerminals";
export * from "./terminalMates";
export * from "./terminals";
export * from "./terminalsAndMates";
export * from "./terminalsAndMatesByRoute";
export * from "./timeAdjustmentsByRoute";
export * from "./timeAdjustments";
export * from "./scheduleValidDateRange";

// Re-export output types from schemas
export type {
  RouteDetailsItem,
  RouteDetails,
  ScheduledRoute,
  ScheduledRoutesArray,
  ActiveDateRange,
  ActiveDateRangesArray,
  Sailing,
  SailingsArray,
  Route,
  RoutesArray,
  TerminalsAndMates,
  TerminalsAndMatesByRoute,
  ScheduleTerminalCombo,
  ScheduleTerminalCombosArray,
} from "@/schemas/wsf-schedule";
