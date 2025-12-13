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
  toolDescription: {
    purpose: "List highway alerts filtered by WSDOT administrative region.",
    useWhen: [
      "focusing on alerts in specific geographic regions",
      "building regional alert dashboards",
      "reducing payload size compared to statewide alerts",
    ],
    avoidWhen: [
      "you need alerts for specific map areas (prefer fetchAlertsByMapArea)",
      "you need filtered results with multiple criteria (prefer searchAlerts)",
      "you need all statewide alerts (prefer fetchAlerts)",
    ],
    inputs: [
      "RegionID: numeric (7=Eastern, 8=North Central, 9=Northwest, 10=Olympic, 11=South Central, 12=Southwest)",
    ],
    returns: "array — one item per alert in the specified region",
    outputHighlights: [
      "IDs: AlertID (unique numeric identifier)",
      "Status: EventStatus ('Open' = active, 'Closed' = resolved)",
      "Priority: Priority ('Highest'/'High'/'Medium'/'Low' traffic impact)",
      "Location: StartRoadwayLocation/EndRoadwayLocation with road, milepost, coordinates",
      "Time: StartTime (when incident began), EndTime (estimated resolution), LastUpdatedTime",
      "Category: EventCategory (type like 'Construction', 'Collision', 'Maintenance')",
      "Descriptions: HeadlineDescription (summary), ExtendedDescription (details)",
      "Regional focus: smaller payload than statewide fetchAlerts",
    ],
    chaining: [
      "fetchAlertsByRegionId → extract AlertID → call fetchAlertById with { AlertID: ... }",
      "fetchAlertsByRegionId → extract EventCategory → call searchAlerts with { Region: ..., EventCategory: ... }",
    ],
  },
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
