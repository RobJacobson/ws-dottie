import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleAlertsResource } from "./scheduleAlerts.endpoints";
import * as fetchFunctions from "./scheduleAlerts.fetch";
import type { ScheduleAlertsInput } from "./scheduleAlerts.input";
import type { AlertDetail } from "./scheduleAlerts.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleAlertsResource,
  fetchFunctions
);

export const useScheduleAlerts: (
  params?: ScheduleAlertsInput,
  options?: QueryHookOptions<AlertDetail[]>
) => UseQueryResult<AlertDetail[], Error> = hooks.useScheduleAlerts;
