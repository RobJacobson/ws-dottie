import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import { highwayAlertsGroup } from "./shared/highwayAlerts.endpoints";
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
 * Fetch function for retrieving all current highway alerts statewide
 */
export const fetchAlerts: FetchFactory<AlertsInput, Alert[]> =
  createFetchFunction({
    api: wsdotHighwayAlertsApiMeta,
    endpoint: alertsMeta,
  });

/**
 * React Query hook for retrieving all current highway alerts statewide
 */
export const useAlerts: HookFactory<AlertsInput, Alert[]> = createHook({
  apiName: wsdotHighwayAlertsApiMeta.name,
  endpointName: alertsMeta.functionName,
  fetchFn: fetchAlerts,
  cacheStrategy: highwayAlertsGroup.cacheStrategy,
});
