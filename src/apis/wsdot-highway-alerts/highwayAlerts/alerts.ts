import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotHighwayAlertsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchAlerts: (
  params?: FetchFunctionParams<AlertsInput>
) => Promise<Alert[]> = createFetchFunction(
  wsdotHighwayAlertsApi.api,
  highwayAlertsGroup,
  alertsMeta
);

/**
 * React Query hook for retrieving all current highway alerts statewide
 */
export const useAlerts: (
  params?: FetchFunctionParams<AlertsInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = createHook(
  wsdotHighwayAlertsApi.api,
  highwayAlertsGroup,
  alertsMeta
);
