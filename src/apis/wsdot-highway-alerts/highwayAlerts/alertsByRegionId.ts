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
  wsdotHighwayAlertsApi,
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
  wsdotHighwayAlertsApi,
  highwayAlertsGroup,
  alertsByRegionIdMeta
);
