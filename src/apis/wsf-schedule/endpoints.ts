import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { activeSeasonsResource } from "./activeSeasons/activeSeasons";
import { scheduleCacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate";
import { routeDetailsResource } from "./routeDetails/routeDetails";
import { routesResource } from "./routes/routes";
import { sailingsResource } from "./sailings/sailings";
import { scheduleAlertsResource } from "./scheduleAlerts/scheduleAlerts";
import { scheduledRoutesResource } from "./scheduledRoutes/scheduledRoutes";
import { schedulesResource } from "./schedules/schedules";
import { scheduleTodayResource } from "./scheduleToday/scheduleToday";
import { serviceDisruptionsResource } from "./serviceDisruptions/serviceDisruptions";
import { scheduleTerminalMatesResource } from "./terminalMates/terminalMates";
import { scheduleTerminalsResource } from "./terminals/terminals";
import { timeAdjustmentsResource } from "./timeAdjustments/timeAdjustments";
import { scheduleValidDateRangeResource } from "./validDateRange/validDateRange";

// Combine all resources into the legacy format for backward compatibility
export const wsfScheduleApi: ApiDefinition = {
  name: "wsf-schedule",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(activeSeasonsResource.endpoints),
    ...Object.values(sailingsResource.endpoints),
    ...Object.values(scheduleCacheFlushDateResource.endpoints),
    ...Object.values(routeDetailsResource.endpoints),
    ...Object.values(routesResource.endpoints),
    ...Object.values(serviceDisruptionsResource.endpoints),
    ...Object.values(scheduleAlertsResource.endpoints),
    ...Object.values(schedulesResource.endpoints),
    ...Object.values(scheduledRoutesResource.endpoints),
    ...Object.values(scheduleTodayResource.endpoints),
    ...Object.values(scheduleValidDateRangeResource.endpoints),
    ...Object.values(scheduleTerminalMatesResource.endpoints),
    ...Object.values(scheduleTerminalsResource.endpoints),
    ...Object.values(timeAdjustmentsResource.endpoints),
  ],
};

// Export individual resources for direct use
export {
  activeSeasonsResource,
  sailingsResource,
  scheduleCacheFlushDateResource,
  routeDetailsResource,
  routesResource,
  serviceDisruptionsResource,
  scheduleAlertsResource,
  schedulesResource,
  scheduledRoutesResource,
  scheduleTodayResource,
  scheduleValidDateRangeResource,
  scheduleTerminalMatesResource,
  scheduleTerminalsResource,
  timeAdjustmentsResource,
};
