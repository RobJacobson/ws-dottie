import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
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
 * Factory result for schedule alerts
 */
const scheduleAlertsFactory = createFetchAndHook<
  ScheduleAlertsInput,
  AlertDetail[]
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleAlertsMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleAlerts.endpoints").scheduleAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all current schedule alerts
 */
export const { fetch: fetchScheduleAlerts, hook: useScheduleAlerts } =
  scheduleAlertsFactory;
