import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { datesHelper } from "@/shared/utils";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import {
  type SearchAlertsInput,
  searchAlertsInputSchema,
} from "./shared/highwayAlerts.input";
import { type Alert, alertSchema } from "./shared/highwayAlerts.output";

/**
 * Metadata for the searchAlerts endpoint
 */
export const searchAlertsMeta = {
  functionName: "searchAlerts",
  endpoint:
    "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
  inputSchema: searchAlertsInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: {
    StateRoute: "405",
    StartingMilepost: 10,
    EndingMilepost: 20,
    SearchTimeStart: datesHelper.yesterday(),
    SearchTimeEnd: datesHelper.today(),
  },
  endpointDescription:
    "Search highway alerts by route, region, time range, and milepost.",
  toolDescription: {
    purpose:
      "Search highway alerts using flexible filters for route, region, time range, and milepost.",
    useWhen: [
      "finding alerts on specific highways or routes",
      "filtering alerts by geographic regions or time periods",
      "getting alerts within milepost ranges on highways",
      "building targeted alert queries",
    ],
    avoidWhen: [
      "you need all statewide alerts (prefer fetchAlerts)",
      "you need alerts for specific map areas (prefer fetchAlertsByMapArea)",
      "you only need one specific alert (prefer fetchAlertById)",
    ],
    inputs: [
      "StateRoute: three-digit route number like '405'",
      "Region: numeric ID (7=Eastern, 8=North Central, 9=Northwest, 10=Olympic, 11=South Central, 12=Southwest)",
      "SearchTimeStart: ISO-8601 UTC format",
      "SearchTimeEnd: ISO-8601 UTC format",
      "StartingMilepost: for route segments",
      "EndingMilepost: for route segments",
    ],
    returns: "array — one item per alert matching search criteria",
    outputHighlights: [
      "IDs: AlertID (unique numeric identifier)",
      "Status: EventStatus ('Open' = active, 'Closed' = resolved)",
      "Priority: Priority ('Highest'/'High'/'Medium'/'Low' traffic impact)",
      "Location: StartRoadwayLocation/EndRoadwayLocation with road, milepost, coordinates",
      "Time: StartTime (when incident began), EndTime (estimated resolution), LastUpdatedTime",
      "Category: EventCategory (type like 'Construction', 'Collision', 'Maintenance')",
      "Descriptions: HeadlineDescription (summary), ExtendedDescription (details)",
      "Filtered results: smaller payload than statewide fetchAlerts",
    ],
    chaining: [
      "fetchEventCategories → extract category name → call searchAlerts with { EventCategory: ... }",
      "searchAlerts → extract AlertID → call fetchAlertById with { AlertID: ... }",
    ],
  },
} satisfies EndpointMeta<SearchAlertsInput, Alert[]>;

/**
 * Factory result for search alerts
 */
const searchAlertsFactory = createFetchAndHook<SearchAlertsInput, Alert[]>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: searchAlertsMeta,
  getEndpointGroup: () =>
    require("./shared/highwayAlerts.endpoints").highwayAlertsGroup,
});

/**
 * Fetch function and React Query hook for searching highway alerts by route, region, time range, and milepost
 */
export const { fetch: searchAlerts, hook: useSearchAlerts } =
  searchAlertsFactory;
