import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import { scheduleAlertsResource } from "./scheduleAlerts.endpoints";
import * as fetchFunctions from "./scheduleAlerts.fetch";
import type { ScheduleAlertsInput } from "./scheduleAlerts.input";
import type { AlertDetail } from "./scheduleAlerts.output";

const hooks = createHooks(
  wsfScheduleApi,
  scheduleAlertsResource,
  fetchFunctions
);

export const useScheduleAlerts: (
  params?: FetchFunctionParams<ScheduleAlertsInput>,
  options?: QueryHookOptions<AlertDetail[]>
) => UseQueryResult<AlertDetail[], Error> = hooks.useScheduleAlerts;
