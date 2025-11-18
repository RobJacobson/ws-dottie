import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
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
  type AlertByIdInput,
  alertByIdInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the fetchAlertById endpoint
 */
export const alertByIdMeta = {
  functionName: "fetchAlertById",
  endpoint: "/getAlertAsJson?AlertID={AlertID}",
  inputSchema: alertByIdInputSchema,
  outputSchema: alertSchema,
  sampleParams: { AlertID: 468632 },
  endpointDescription: "Get highway alert details for a specific alert ID.",
} satisfies EndpointMeta<AlertByIdInput, Alert>;

/**
 * Fetch function for retrieving highway alert details for a specific alert ID
 */
export const fetchAlertById: (
  params?: FetchFunctionParams<AlertByIdInput>
) => Promise<Alert> = createFetchFunction(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertByIdMeta
);

/**
 * React Query hook for retrieving highway alert details for a specific alert ID
 */
export const useAlertById: (
  params?: FetchFunctionParams<AlertByIdInput>,
  options?: QueryHookOptions<Alert>
) => UseQueryResult<Alert, Error> = createHook(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertByIdMeta
);
