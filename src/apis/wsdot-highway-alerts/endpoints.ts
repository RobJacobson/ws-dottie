import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotHighwayAlertsApi: ApiDefinition = {
  name: "wsdot-highway-alerts",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/highwayalerts/highwayalertsrest.svc",
  endpoints: [
    /**
     * Alert response
     */
    {
      function: "getAlerts",
      endpoint: "/getAlertsAsJson",
      inputSchema: i.getAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetAlertsInput, o.Alert[]>,
    {
      function: "getAlert",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: i.getAlertSchema,
      outputSchema: o.alertSchema,
      sampleParams: { AlertID: 468632 },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetAlertInput, o.Alert>,
    {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: i.getAlertsByRegionIDSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { RegionID: 9 },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetAlertsByRegionIDInput, o.Alert[]>,
    {
      function: "getAlertsForMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: i.getAlertsForMapAreaSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { MapArea: "Seattle" },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetAlertsForMapAreaInput, o.Alert[]>,
    {
      function: "searchAlerts",
      endpoint:
        "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
      inputSchema: i.searchAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {
        StateRoute: "405",
        StartingMilepost: 10,
        EndingMilepost: 20,
        SearchTimeStart: datesHelper.yesterday(),
        SearchTimeEnd: datesHelper.today(),
      },
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.SearchAlertsInput, o.Alert[]>,
    /**
     * String response
     */
    {
      function: "getEventCategories",
      endpoint: "/getEventCategoriesAsJson",
      inputSchema: i.getEventCategoriesSchema,
      outputSchema: z.array(z.string()),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetEventCategoriesInput, string[]>,
    /**
     * Area response
     */
    {
      function: "getMapAreas",
      endpoint: "/getMapAreasAsJson",
      inputSchema: i.getMapAreasSchema,
      outputSchema: z.array(o.areaSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: "",
    } satisfies EndpointDefinition<i.GetMapAreasInput, o.Area[]>,
  ],
};
