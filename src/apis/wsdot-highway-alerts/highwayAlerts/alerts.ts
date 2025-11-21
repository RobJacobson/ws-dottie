import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import {
  type AlertsInput,
  alertsInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the fetchAlerts endpoint
 */
export const alertsMeta = {
  functionName: "fetchAlerts",
  endpoint: "/getAlertsAsJson",
  inputSchema: alertsInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: {},
  endpointDescription: "List all current highway alerts statewide.",
} satisfies EndpointMeta<AlertsInput, Alert[]>;

/**
 * Factory result for alerts
 */
const alertsFactory = createFetchAndHook<AlertsInput, Alert[]>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertsMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all current highway alerts statewide
 */
export const { fetch: fetchAlerts, hook: useAlerts } = alertsFactory;
