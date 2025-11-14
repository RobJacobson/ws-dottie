import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsf-schedule",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
} as const;

// THEN import groups (which can use API constant)
import { activeSeasonsGroup } from "./activeSeasons/activeSeasons.endpoints";
import { cacheFlushDateScheduleGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { routeDetailsGroup } from "./routeDetails/routeDetails.endpoints";
import { routesGroup } from "./routes/routes.endpoints";
import { sailingsGroup } from "./sailings/sailings.endpoints";
import { scheduleAlertsGroup } from "./scheduleAlerts/scheduleAlerts.endpoints";
import { scheduledRoutesGroup } from "./scheduledRoutes/scheduledRoutes.endpoints";
import { schedulesGroup } from "./schedules/schedules.endpoints";
import { scheduleTodayGroup } from "./scheduleToday/scheduleToday.endpoints";
import { serviceDisruptionsGroup } from "./serviceDisruptions/serviceDisruptions.endpoints";
import { scheduleTerminalMatesGroup } from "./terminalMates/terminalMates.endpoints";
import { scheduleTerminalsGroup } from "./terminals/terminals.endpoints";
import { timeAdjustmentsGroup } from "./timeAdjustments/timeAdjustments.endpoints";
import { scheduleValidDateRangeGroup } from "./validDateRange/validDateRange.endpoints";

// Finally, construct full API definition using API constant
export const wsfScheduleApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [
    activeSeasonsGroup,
    sailingsGroup,
    cacheFlushDateScheduleGroup,
    routeDetailsGroup,
    routesGroup,
    serviceDisruptionsGroup,
    scheduleAlertsGroup,
    schedulesGroup,
    scheduledRoutesGroup,
    scheduleTodayGroup,
    scheduleValidDateRangeGroup,
    scheduleTerminalMatesGroup,
    scheduleTerminalsGroup,
    timeAdjustmentsGroup,
  ],
} satisfies ApiDefinition;
