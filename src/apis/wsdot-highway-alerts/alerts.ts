import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Highway alerts provide real-time information about traffic incidents, road conditions, construction, and other events affecting Washington State highways. Alerts include location details, impact levels, and estimated duration.";

export const alertsResource = {
  name: "alerts",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getAlerts",
      endpoint: "/getAlertsAsJson",
      inputSchema: i.getAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns all current highway alerts. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetAlertsInput, o.Alert[]>,
    byId: {
      function: "getAlertById",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: i.getAlertSchema,
      outputSchema: o.alertSchema,
      sampleParams: { AlertID: 468632 },
      cacheStrategy: "FREQUENT",
      description: `Returns a specific highway alert by its unique identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetAlertInput, o.Alert>,
    byRegionId: {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: i.getAlertsByRegionIDSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { RegionID: 9 },
      cacheStrategy: "FREQUENT",
      description: `Returns all highway alerts for a specific WSDOT region (EA, NC, NW, OL, SC, SW). ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetAlertsByRegionIDInput, o.Alert[]>,
    byMapArea: {
      function: "getAlertsByMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: i.getAlertsForMapAreaSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { MapArea: "Seattle" },
      cacheStrategy: "FREQUENT",
      description: `Returns highway alerts for a specific map area (e.g., Seattle, Tacoma, Spokane). ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetAlertsForMapAreaInput, o.Alert[]>,
    search: {
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
      description: `Search for highway alerts using multiple criteria including state route, region, time range, and milepost range. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.SearchAlertsInput, o.Alert[]>,
  },
};
