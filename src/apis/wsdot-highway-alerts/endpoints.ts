import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsdotHighwayAlertsApi = createApiDefinition(
  "wsdot-highway-alerts",
  [
    {
      function: "getAlerts",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson",
      inputSchema: input.getAlertsSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlert",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}",
      inputSchema: input.getAlertSchema,
      outputSchema: output.alertSchema,
      sampleParams: { AlertID: 468632 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsByRegionId",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: input.getAlertsByRegionIDSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: { RegionID: 9 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsForMapArea",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: input.getAlertsForMapAreaSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: { MapArea: "Seattle" },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getEventCategories",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson",
      inputSchema: input.getEventCategoriesSchema,
      outputSchema: output.areasListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getMapAreas",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson",
      inputSchema: input.getMapAreasSchema,
      outputSchema: output.areasListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "searchAlerts",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
      inputSchema: input.searchAlertsSchema,
      outputSchema: output.alertsListSchema,
      sampleParams: {
        StateRoute: "405",
        SearchTimeStart: "2025-08-01",
        SearchTimeEnd: "2025-09-30",
      },
      cacheStrategy: "FREQUENT",
    },
  ]
);
