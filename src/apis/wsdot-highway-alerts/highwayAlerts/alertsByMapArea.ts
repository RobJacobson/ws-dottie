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
  type AlertsByMapAreaInput,
  alertsByMapAreaInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the fetchAlertsByMapArea endpoint
 */
export const alertsByMapAreaMeta = {
  functionName: "fetchAlertsByMapArea",
  endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
  inputSchema: alertsByMapAreaInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { MapArea: "Seattle" },
  endpointDescription: "List highway alerts filtered by map area code.",
} satisfies EndpointMeta<AlertsByMapAreaInput, Alert[]>;

/**
 * Fetch function for retrieving highway alerts filtered by map area code
 */
export const fetchAlertsByMapArea: (
  params?: FetchFunctionParams<AlertsByMapAreaInput>
) => Promise<Alert[]> = createFetchFunction(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertsByMapAreaMeta
);

/**
 * React Query hook for retrieving highway alerts filtered by map area code
 */
export const useAlertsByMapArea: (
  params?: FetchFunctionParams<AlertsByMapAreaInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = createHook(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertsByMapAreaMeta
);
