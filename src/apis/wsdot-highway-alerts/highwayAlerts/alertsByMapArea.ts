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
export const fetchAlertsByMapArea: FetchFactory<AlertsByMapAreaInput, Alert[]> =
  createFetchFunction({
    api: wsdotHighwayAlertsApiMeta,
    endpoint: alertsByMapAreaMeta,
  });

/**
 * React Query hook for retrieving highway alerts filtered by map area code
 */
export const useAlertsByMapArea: HookFactory<AlertsByMapAreaInput, Alert[]> =
  createHook({
    apiName: wsdotHighwayAlertsApiMeta.name,
    endpointName: alertsByMapAreaMeta.functionName,
    fetchFn: fetchAlertsByMapArea,
    cacheStrategy: highwayAlertsGroup.cacheStrategy,
  });
