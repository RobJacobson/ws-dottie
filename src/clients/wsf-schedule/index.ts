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

// Re-export common types to avoid conflicts
export * from "./scheduleToday";
export * from "./scheduleTodayByRoute";
export * from "./scheduleTodayByTerminals";
export * from "./terminalMates";
export * from "./terminals";
export * from "./terminalsAndMates";
export * from "./terminalsAndMatesByRoute";
export * from "./timeAdjustmentsByRoute";
export * from "./timeAdjustments";
export * from "./validDateRange";

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
  ValidDateRange,
} from "@/schemas/wsf-schedule";
