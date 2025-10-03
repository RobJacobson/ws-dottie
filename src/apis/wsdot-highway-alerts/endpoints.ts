import type { ApiDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { input, output } from "./schemas";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpoints: [
    {
      function: "getAlerts",
      endpoint: "/getAlertsAsJson",
      inputSchema: input.getAlertsSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlert",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: input.getAlertSchema,
      outputSchema: output.alertSchema,
      sampleParams: { AlertID: 468632 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: input.getAlertsByRegionIDSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: { RegionID: 9 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsForMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: input.getAlertsForMapAreaSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: { MapArea: "Seattle" },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getEventCategories",
      endpoint: "/getEventCategoriesAsJson",
      inputSchema: input.getEventCategoriesSchema,
      outputSchema: output.eventCategoriesListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getMapAreas",
      endpoint: "/getMapAreasAsJson",
      inputSchema: input.getMapAreasSchema,
      outputSchema: output.areasListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "searchAlerts",
      endpoint:
        "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
      inputSchema: input.searchAlertsSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: {
        StateRoute: "405",
        SearchTimeStart: datesHelper.yesterday(),
        SearchTimeEnd: datesHelper.tomorrow(),
      },
      cacheStrategy: "FREQUENT",
    },
  ],
};
