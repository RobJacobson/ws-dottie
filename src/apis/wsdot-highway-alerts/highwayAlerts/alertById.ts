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
  toolDescription: {
    purpose:
      "Get complete details for a single highway alert by its unique ID.",
    useWhen: [
      "getting full details for a specific alert",
      "enriching alert data from bulk queries",
      "displaying individual alert detail pages",
      "minimizing payload when you only need one alert",
    ],
    avoidWhen: [
      "you need multiple alerts (prefer bulk endpoints like fetchAlerts or searchAlerts)",
      "you don't have an AlertID (prefer bulk endpoints to discover IDs)",
    ],
    inputsHighlights:
      "AlertID (numeric ID from bulk alert queries like fetchAlerts → AlertID)",
    returns: "object — complete details for one highway alert",
    outputHighlights: [
      "IDs: AlertID, links to related location/route data",
      "Status: EventStatus ('Open'/'Closed'), Priority ('Highest'/'High'/'Medium'/'Low')",
      "Location: StartRoadwayLocation/EndRoadwayLocation with precise coordinates, mileposts, road details",
      "Time: StartTime (incident began), EndTime (estimated resolution), LastUpdatedTime (last modified)",
      "Category: EventCategory (incident type), Region (administrative area)",
      "Descriptions: HeadlineDescription (impact summary), ExtendedDescription (full details)",
      "County: affected county name when applicable",
      "Complete details: includes all fields available for the alert",
    ],
    chaining: [
      "fetchAlerts → extract AlertID → call fetchAlertById with { AlertID: ... }",
      "searchAlerts → extract AlertID → call fetchAlertById with { AlertID: ... }",
      "fetchAlertsByRegionId → extract AlertID → call fetchAlertById with { AlertID: ... }",
      "fetchAlertsByMapArea → extract AlertID → call fetchAlertById with { AlertID: ... }",
    ],
  },
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
