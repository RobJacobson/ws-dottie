import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
export const fetchScheduleAlerts: FetchFactory<
  ScheduleAlertsInput,
  AlertDetail[]
> = createFetchFunction({
  api: wsfScheduleApiMeta,
  endpoint: scheduleAlertsMeta,
});

/**
 * React Query hook for retrieving all current schedule alerts
 */
export const useScheduleAlerts: HookFactory<
  ScheduleAlertsInput,
  AlertDetail[]
> = createHook({
  apiName: wsfScheduleApiMeta.name,
  endpointName: scheduleAlertsMeta.functionName,
  fetchFn: fetchScheduleAlerts,
  cacheStrategy: scheduleAlertsGroup.cacheStrategy,
});
