import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
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
  toolDescription: {
    purpose:
      "List all currently active highway alerts across Washington State.",
    useWhen: [
      "monitoring statewide traffic conditions",
      "building comprehensive alert dashboards",
      "one-time bulk export of all active incidents",
    ],
    avoidWhen: [
      "you only need alerts for specific regions (prefer fetchAlertsByRegionId)",
      "you only need alerts for specific map areas (prefer fetchAlertsByMapArea)",
      "you need filtered results (prefer searchAlerts)",
    ],
    inputs: [],
    returns: "array — one item per active highway alert",
    outputHighlights: [
      "IDs: AlertID (unique numeric identifier)",
      "Status: EventStatus ('Open' = active, 'Closed' = resolved)",
      "Priority: Priority ('Highest'/'High'/'Medium'/'Low' traffic impact)",
      "Location: StartRoadwayLocation/EndRoadwayLocation with road, milepost, coordinates",
      "Time: StartTime (when incident began), EndTime (estimated resolution), LastUpdatedTime",
      "Category: EventCategory (type like 'Construction', 'Collision', 'Maintenance')",
      "Descriptions: HeadlineDescription (summary), ExtendedDescription (details)",
      "Large payload: ~100-200+ alerts with detailed location and text data",
    ],
    chaining: [
      "fetchAlerts → extract AlertID → call fetchAlertById with { AlertID: ... }",
      "fetchAlerts → extract Region → call fetchAlertsByRegionId with { RegionID: ... }",
      "fetchAlerts → extract EventCategory → call searchAlerts with { EventCategory: ... }",
    ],
  },
} satisfies EndpointMeta<AlertsInput, Alert[]>;

/**
 * Factory result for alerts
 */
const alertsFactory = createFetchAndHook<AlertsInput, Alert[]>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: alertsMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all current highway alerts statewide
 */
export const { fetch: fetchAlerts, hook: useAlerts } = alertsFactory;
