import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleAlertsResource } from "./scheduleAlerts.endpoints";
import type { ScheduleAlertsInput } from "./scheduleAlerts.input";
import type { AlertDetail } from "./scheduleAlerts.output";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleAlertsResource
);

export const fetchScheduleAlerts: (
  params?: FetchFunctionParams<ScheduleAlertsInput>
) => Promise<AlertDetail[]> = fetchFunctions.fetchScheduleAlerts;
