import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleAlertsResource } from "./scheduleAlerts.endpoints";
import type { ScheduleAlertsInput } from "./scheduleAlerts.input";
import type { AlertDetail } from "./scheduleAlerts.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleAlertsResource
);

export const fetchScheduleAlerts = fetchFunctions.fetchScheduleAlerts as (
  params?: FetchFunctionParams<ScheduleAlertsInput>
) => Promise<AlertDetail[]>;
