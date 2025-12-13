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
  toolDescription: {
    purpose: "List highway alerts filtered by geographic map area code.",
    useWhen: [
      "focusing on alerts in specific local areas",
      "building city or neighborhood alert displays",
      "reducing payload size for targeted geographic queries",
    ],
    avoidWhen: [
      "you need alerts for administrative regions (prefer fetchAlertsByRegionId)",
      "you need filtered results with multiple criteria (prefer searchAlerts)",
      "you need all statewide alerts (prefer fetchAlerts)",
    ],
    inputsHighlights:
      "MapArea (code from fetchMapAreas like 'L2PS' for Puget Sound, 'L2SE' for Seattle)",
    returns: "array — one item per alert in the specified map area",
    outputHighlights: [
      "IDs: AlertID (unique numeric identifier)",
      "Status: EventStatus ('Open' = active, 'Closed' = resolved)",
      "Priority: Priority ('Highest'/'High'/'Medium'/'Low' traffic impact)",
      "Location: StartRoadwayLocation/EndRoadwayLocation with road, milepost, coordinates",
      "Time: StartTime (when incident began), EndTime (estimated resolution), LastUpdatedTime",
      "Category: EventCategory (type like 'Construction', 'Collision', 'Maintenance')",
      "Descriptions: HeadlineDescription (summary), ExtendedDescription (details)",
      "Localized focus: smaller payload than statewide or regional queries",
    ],
    chaining: [
      "fetchMapAreas → extract MapArea → call fetchAlertsByMapArea with { MapArea: ... }",
      "fetchAlertsByMapArea → extract AlertID → call fetchAlertById with { AlertID: ... }",
    ],
  },
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
