import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  alertByIdInputSchema,
  alertsByMapAreaInputSchema,
  alertsByRegionIDInputSchema,
  alertsInputSchema,
  searchAlertsInputSchema,
} from "./highwayAlerts.input";
import { alertSchema } from "./highwayAlerts.output";

export const highwayAlertsGroup: EndpointGroup = {
  name: "highwayAlerts",
  // Using FREQUENT strategy because highway alerts can change every few minutes as incidents occur
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Real-time highway alerts for traffic incidents and road conditions.",
    description:
      "Traffic incidents, construction, maintenance, and other events affecting Washington State highways, including location details, impact levels, timestamps, and event classifications.",
    useCases: [
      "Monitor real-time traffic incidents and road conditions.",
      "Plan alternate routes based on current highway alerts.",
      "Display active alerts filtered by location, region, or category.",
      "Track alert status and estimated resolution times.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchAlerts = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlerts",
  endpoint: "/getAlertsAsJson",
  inputSchema: alertsInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: {},
  endpointDescription: "List all current highway alerts statewide.",
});

export const fetchAlertById = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertById",
  endpoint: "/getAlertAsJson?AlertID={AlertID}",
  inputSchema: alertByIdInputSchema,
  outputSchema: alertSchema,
  sampleParams: { AlertID: 468632 },
  endpointDescription: "Get highway alert details for a specific alert ID.",
});

export const fetchAlertsByRegionId = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertsByRegionId",
  endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
  inputSchema: alertsByRegionIDInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { RegionID: 4 },
  endpointDescription: "List highway alerts filtered by WSDOT region ID.",
});

export const fetchAlertsByMapArea = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertsByMapArea",
  endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
  inputSchema: alertsByMapAreaInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { MapArea: "Seattle" },
  endpointDescription: "List highway alerts filtered by map area code.",
});

export const searchAlerts = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
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
});
