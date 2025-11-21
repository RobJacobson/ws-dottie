import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
 * Factory result for alert by ID
 */
const alertByIdFactory = createFetchAndHook<AlertByIdInput, Alert>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertByIdMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving highway alert details for a specific alert ID
 */
export const { fetch: fetchAlertById, hook: useAlertById } = alertByIdFactory;
