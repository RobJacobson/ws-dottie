import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./alerts.input";
import * as o from "./alerts.output";

export const alertsResource = {
  name: "alerts",
  resourceDescription:
    "Highway alerts provide real-time information about traffic incidents, road conditions, construction, and other events affecting Washington State highways. Alerts include location details, impact levels, and estimated duration.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getAlerts: {
      function: "getAlerts",
      endpoint: "/getAlertsAsJson",
      inputSchema: i.getAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {},
      endpointDescription: "Returns all current highway alerts.",
    } satisfies EndpointDefinition<i.GetAlertsInput, o.Alert[]>,
    getAlertById: {
      function: "getAlertById",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: i.getAlertSchema,
      outputSchema: o.alertSchema,
      sampleParams: { AlertID: 468632 },
      endpointDescription:
        "Returns a specific highway alert by its unique identifier.",
    } satisfies EndpointDefinition<i.GetAlertInput, o.Alert>,
    getAlertsByRegionId: {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: i.getAlertsByRegionIDSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { RegionID: 9 },
      endpointDescription:
        "Returns all highway alerts for a specific WSDOT region (EA, NC, NW, OL, SC, SW).",
    } satisfies EndpointDefinition<i.GetAlertsByRegionIDInput, o.Alert[]>,
    getAlertsByMapArea: {
      function: "getAlertsByMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: i.getAlertsForMapAreaSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { MapArea: "Seattle" },
      endpointDescription:
        "Returns highway alerts for a specific map area (e.g., Seattle, Tacoma, Spokane).",
    } satisfies EndpointDefinition<i.GetAlertsForMapAreaInput, o.Alert[]>,
    searchAlerts: {
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
      endpointDescription:
        "Search for highway alerts using multiple criteria including state route, region, time range, and milepost range.",
    } satisfies EndpointDefinition<i.SearchAlertsInput, o.Alert[]>,
  },
};
