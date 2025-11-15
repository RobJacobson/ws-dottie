import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  alertByIdInputSchema,
  alertsByCountyInputSchema,
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
    resourceDescription:
      "Each Alert item represents real-time traffic incidents, road conditions, construction, and other events affecting Washington State highways. These include location details, impact levels, start/end times, and estimated duration.",
    businessContext:
      "Use to monitor traffic incidents and plan alternate routes by providing real-time highway alerts, incident locations, and impact assessments for Washington State roads.",
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
  endpointDescription:
    "Returns an array of Alert objects for all current highway incidents.",
});

export const fetchAlertById = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertById",
  endpoint: "/getAlertAsJson?AlertID={AlertID}",
  inputSchema: alertByIdInputSchema,
  outputSchema: alertSchema,
  sampleParams: { AlertID: 468632 },
  endpointDescription: "Returns a single Alert object for specified AlertID.",
});

export const fetchAlertsByRegionId = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertsByRegionId",
  endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
  inputSchema: alertsByRegionIDInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { RegionID: 4 },
  endpointDescription:
    "Returns an array of Alert objects for specified region.",
});

export const fetchAlertsByCounty = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertsByCounty",
  endpoint: "/getAlertsByCountyAsJson?County={County}",
  inputSchema: alertsByCountyInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { County: "King" },
  endpointDescription:
    "Returns an array of Alert objects for specified county.",
});

export const fetchAlertsByMapArea = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: highwayAlertsGroup,
  functionName: "fetchAlertsByMapArea",
  endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
  inputSchema: alertsByMapAreaInputSchema,
  outputSchema: alertSchema.array(),
  sampleParams: { MapArea: "Seattle" },
  endpointDescription:
    "Returns an array of Alert objects for specified geographic area.",
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
    "Returns an array of Alert objects matching specified search criteria.",
});
