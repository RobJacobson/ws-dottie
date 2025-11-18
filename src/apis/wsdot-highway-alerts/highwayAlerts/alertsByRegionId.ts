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
} from "@/shared/factories/metaEndpointFactory";
import { highwayAlertsGroup } from "./shared/highwayAlerts.endpoints";
import {
  type AlertsByRegionIDInput,
  alertsByRegionIDInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the fetchAlertsByRegionId endpoint
 */
export const alertsByRegionIdMeta = {
  functionName: "fetchAlertsByRegionId",
  endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
  inputSchema: alertsByRegionIDInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { RegionID: 4 },
  endpointDescription: "List highway alerts filtered by WSDOT region ID.",
} satisfies EndpointMeta<AlertsByRegionIDInput, Alert[]>;

/**
 * Fetch function for retrieving highway alerts filtered by WSDOT region ID
 */
export const fetchAlertsByRegionId: (
  params?: FetchFunctionParams<AlertsByRegionIDInput>
) => Promise<Alert[]> = createFetchFunction(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertsByRegionIdMeta
);

/**
 * React Query hook for retrieving highway alerts filtered by WSDOT region ID
 */
export const useAlertsByRegionId: (
  params?: FetchFunctionParams<AlertsByRegionIDInput>,
  options?: QueryHookOptions<Alert[]>
) => UseQueryResult<Alert[], Error> = createHook(
  apis.wsdotHighwayAlerts,
  highwayAlertsGroup,
  alertsByRegionIdMeta
);
