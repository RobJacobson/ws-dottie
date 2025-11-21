import type { ApiDefinition } from "@/apis/types";
import { activeSeasonsGroup } from "./activeSeasons/shared/activeSeasons.endpoints";
import { wsfScheduleApiMeta } from "./apiMeta";
import { cacheFlushDateScheduleGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { routeDetailsGroup } from "./routeDetails/shared/routeDetails.endpoints";
import { routesGroup } from "./routes/shared/routes.endpoints";
import { sailingsGroup } from "./sailings/shared/sailings.endpoints";
import { scheduleAlertsGroup } from "./scheduleAlerts/shared/scheduleAlerts.endpoints";
import { scheduledRoutesGroup } from "./scheduledRoutes/shared/scheduledRoutes.endpoints";
import { schedulesGroup } from "./schedules/shared/schedules.endpoints";
import { scheduleTodayGroup } from "./scheduleToday/shared/scheduleToday.endpoints";
import { serviceDisruptionsGroup } from "./serviceDisruptions/shared/serviceDisruptions.endpoints";
import { scheduleTerminalMatesGroup } from "./terminalMates/shared/terminalMates.endpoints";
import { scheduleTerminalsGroup } from "./terminals/shared/terminals.endpoints";
import { timeAdjustmentsGroup } from "./timeAdjustments/shared/timeAdjustments.endpoints";
import { scheduleValidDateRangeGroup } from "./validDateRange/shared/validDateRange.endpoints";

export const wsfScheduleApi: ApiDefinition = {
  api: wsfScheduleApiMeta,
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
};
