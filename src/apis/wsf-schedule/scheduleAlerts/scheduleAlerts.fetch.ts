import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
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
