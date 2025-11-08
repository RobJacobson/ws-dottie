import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfScheduleApi } from "../apiDefinition";
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
