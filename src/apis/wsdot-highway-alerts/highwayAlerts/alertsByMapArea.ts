import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
 * Factory result for alerts by map area
 */
const alertsByMapAreaFactory = createFetchAndHook<
  AlertsByMapAreaInput,
  Alert[]
>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertsByMapAreaMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving highway alerts filtered by map area code
 */
export const { fetch: fetchAlertsByMapArea, hook: useAlertsByMapArea } =
  alertsByMapAreaFactory;
