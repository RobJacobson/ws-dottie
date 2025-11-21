import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
 * Factory result for alerts by region ID
 */
const alertsByRegionIdFactory = createFetchAndHook<
  AlertsByRegionIDInput,
  Alert[]
>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertsByRegionIdMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving highway alerts filtered by WSDOT region ID
 */
export const { fetch: fetchAlertsByRegionId, hook: useAlertsByRegionId } =
  alertsByRegionIdFactory;
