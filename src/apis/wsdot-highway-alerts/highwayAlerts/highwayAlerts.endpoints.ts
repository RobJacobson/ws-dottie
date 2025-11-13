import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import {
  alertByIdInputSchema,
  alertsByMapAreaInputSchema,
  alertsByRegionIDInputSchema,
  alertsInputSchema,
  searchAlertsInputSchema,
} from "./highwayAlerts.input";
import { alertSchema } from "./highwayAlerts.output";

const group = defineEndpointGroup({
  api: wsdotHighwayAlertsApi,
  name: "highwayAlerts",
  documentation: {
    resourceDescription:
      "Each Alert item represents real-time traffic incidents, road conditions, construction, and other events affecting Washington State highways. These include location details, impact levels, start/end times, and estimated duration.",
    businessContext:
      "Use to monitor traffic incidents and plan alternate routes by providing real-time highway alerts, incident locations, and impact assessments for Washington State roads.",
  },
  // Using FREQUENT strategy because highway alerts can change every few minutes as incidents occur
  cacheStrategy: "FREQUENT",
});

export const fetchAlerts = defineEndpoint({
  group,
  functionName: "fetchAlerts",
  definition: {
    endpoint: "/getAlertsAsJson",
    inputSchema: alertsInputSchema,
    outputSchema: alertSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns an array of Alert objects for all current highway incidents.",
  },
});

export const fetchAlertById = defineEndpoint({
  group,
  functionName: "fetchAlertById",
  definition: {
    endpoint: "/getAlertAsJson?AlertID={AlertID}",
    inputSchema: alertByIdInputSchema,
    outputSchema: alertSchema,
    sampleParams: { AlertID: 468632 },
    endpointDescription: "Returns a single Alert object for specified AlertID.",
  },
});

export const fetchAlertsByRegionId = defineEndpoint({
  group,
  functionName: "fetchAlertsByRegionId",
  definition: {
    endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
    inputSchema: alertsByRegionIDInputSchema,
    outputSchema: alertSchema.array(),
    sampleParams: { RegionID: 9 },
    endpointDescription:
      "Returns an array of Alert objects for specified WSDOT region.",
  },
});

export const fetchAlertsByMapArea = defineEndpoint({
  group,
  functionName: "fetchAlertsByMapArea",
  definition: {
    endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
    inputSchema: alertsByMapAreaInputSchema,
    outputSchema: alertSchema.array(),
    sampleParams: { MapArea: "Seattle" },
    endpointDescription:
      "Returns an array of Alert objects for specified geographic area.",
  },
});

export const searchAlerts = defineEndpoint({
  group,
  functionName: "searchAlerts",
  definition: {
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
  },
});

export const highwayAlertsGroup = group.descriptor;
