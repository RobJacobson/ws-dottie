import type { UseQueryResult } from "@tanstack/react-query";
import { wsfScheduleApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { scheduleAlertsGroup } from "./shared/scheduleAlerts.endpoints";
import {
  type ScheduleAlertsInput,
  scheduleAlertsInputSchema,
} from "./shared/scheduleAlerts.input";
import {
  type AlertDetail,
  alertDetailSchema,
} from "./shared/scheduleAlerts.output";

/**
 * Metadata for the fetchScheduleAlerts endpoint
 */
export const scheduleAlertsMeta = {
  functionName: "fetchScheduleAlerts",
  endpoint: "/alerts",
  inputSchema: scheduleAlertsInputSchema,
  outputSchema: alertDetailSchema.array(),
  sampleParams: {},
  endpointDescription: "List all current schedule alerts.",
} satisfies EndpointMeta<ScheduleAlertsInput, AlertDetail[]>;

/**
 * Fetch function for retrieving all current schedule alerts
 */
export const fetchScheduleAlerts: (
  params?: FetchFunctionParams<ScheduleAlertsInput>
) => Promise<AlertDetail[]> = createFetchFunction(
  wsfScheduleApi.api,
  scheduleAlertsGroup,
  scheduleAlertsMeta
);

/**
 * React Query hook for retrieving all current schedule alerts
 */
export const useScheduleAlerts: (
  params?: FetchFunctionParams<ScheduleAlertsInput>,
  options?: QueryHookOptions<AlertDetail[]>
) => UseQueryResult<AlertDetail[], Error> = createHook(
  wsfScheduleApi.api,
  scheduleAlertsGroup,
  scheduleAlertsMeta
);
