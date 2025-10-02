import { createApiDefinition } from "../utils";
import {
  getAlertInputSchema,
  getAlertsByRegionIDInputSchema,
  getAlertsForMapAreaInputSchema,
  getAlertsInputSchema,
  getEventCategoriesInputSchema,
  getMapAreasInputSchema,
  searchAlertsInputSchema,
} from "./original/inputSchemas.original";
import {
  alertSchema,
  alertsListSchema,
  areasListSchema,
} from "./original/outputSchemas.original";

export const wsdotHighwayAlertsApi = createApiDefinition(
  "wsdot-highway-alerts",
  [
    {
      function: "getAlerts",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson",
      inputSchema: getAlertsInputSchema,
      outputSchema: alertsListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlert",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}",
      inputSchema: getAlertInputSchema,
      outputSchema: alertSchema,
      sampleParams: { AlertID: 468632 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsByRegionId",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: getAlertsByRegionIDInputSchema,
      outputSchema: alertsListSchema,
      sampleParams: { RegionID: 9 },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getAlertsForMapArea",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: getAlertsForMapAreaInputSchema,
      outputSchema: alertsListSchema,
      sampleParams: { MapArea: "Seattle" },
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getEventCategories",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson",
      inputSchema: getEventCategoriesInputSchema,
      outputSchema: areasListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "getMapAreas",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetMapAreasAsJson",
      inputSchema: getMapAreasInputSchema,
      outputSchema: areasListSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
    },
    {
      function: "searchAlerts",
      endpoint:
        "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?SearchText={SearchText}",
      inputSchema: searchAlertsInputSchema,
      outputSchema: alertsListSchema,
      sampleParams: { SearchText: "I-5" },
      cacheStrategy: "FREQUENT",
    },
  ]
);
