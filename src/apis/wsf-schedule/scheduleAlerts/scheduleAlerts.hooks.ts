import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useScheduleAlerts = hooks.useScheduleAlerts as (
  params?: ScheduleAlertsInput,
  options?: QueryHookOptions<AlertDetail[]>
) => UseQueryResult<AlertDetail[], Error>;
