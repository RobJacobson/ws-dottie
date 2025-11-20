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
export const fetchAlertsByRegionId: FetchFactory<
  AlertsByRegionIDInput,
  Alert[]
> = createFetchFunction({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertsByRegionIdMeta,
});

/**
 * React Query hook for retrieving highway alerts filtered by WSDOT region ID
 */
export const useAlertsByRegionId: HookFactory<AlertsByRegionIDInput, Alert[]> =
  createHook({
    apiName: wsdotHighwayAlertsApiMeta.name,
    endpointName: alertsByRegionIdMeta.functionName,
    fetchFn: fetchAlertsByRegionId,
    cacheStrategy: highwayAlertsGroup.cacheStrategy,
  });
