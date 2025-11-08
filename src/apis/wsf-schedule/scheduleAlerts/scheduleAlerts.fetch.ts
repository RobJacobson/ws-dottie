import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleAlertsResource } from "./scheduleAlerts.endpoints";
import type { ScheduleAlertsInput } from "./scheduleAlerts.input";
import type { AlertDetail } from "./scheduleAlerts.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleAlertsResource
);

export const fetchScheduleAlerts: (
  params?: FetchFunctionParams<ScheduleAlertsInput>
) => Promise<AlertDetail[]> = fetchFunctions.fetchScheduleAlerts;
