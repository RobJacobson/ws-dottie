import type { ApiDefinition } from "@/apis/types";

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

export const wsfScheduleApi = {
  name: "wsf-schedule",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
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
