import type { ApiDefinition } from "@/apis/types";

import { activeSeasonsResource } from "./activeSeasons/activeSeasons.endpoints";
import { cacheFlushDateSchedule } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { routeDetailsResource } from "./routeDetails/routeDetails.endpoints";
import { routesResource } from "./routes/routes.endpoints";
import { sailingsResource } from "./sailings/sailings.endpoints";
import { scheduleAlertsResource } from "./scheduleAlerts/scheduleAlerts.endpoints";
import { scheduledRoutesResource } from "./scheduledRoutes/scheduledRoutes.endpoints";
import { schedulesResource } from "./schedules/schedules.endpoints";
import { scheduleTodayResource } from "./scheduleToday/scheduleToday.endpoints";
import { serviceDisruptionsResource } from "./serviceDisruptions/serviceDisruptions.endpoints";
import { scheduleTerminalMatesResource } from "./terminalMates/terminalMates.endpoints";
import { scheduleTerminalsResource } from "./terminals/terminals.endpoints";
import { timeAdjustmentsResource } from "./timeAdjustments/timeAdjustments.endpoints";
import { scheduleValidDateRangeResource } from "./validDateRange/validDateRange.endpoints";

export const wsfScheduleApi = {
  name: "wsf-schedule",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  endpointGroups: [
    activeSeasonsResource,
    sailingsResource,
    cacheFlushDateSchedule,
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
  ],
} satisfies ApiDefinition;
