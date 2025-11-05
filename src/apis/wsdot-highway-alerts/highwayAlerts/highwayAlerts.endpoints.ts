import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./highwayAlerts.input";
import * as o from "./highwayAlerts.output";

export const highwayAlertsGroup: EndpointGroup = {
  name: "highwayAlerts",
  documentation: {
    resourceDescription:
      "Each Alert item represents real-time traffic incidents, road conditions, construction, and other events affecting Washington State highways. These include location details, impact levels, start/end times, and estimated duration.",
    businessContext:
      "Use to monitor traffic incidents and plan alternate routes by providing real-time highway alerts, incident locations, and impact assessments for Washington State roads.",
  },
  // Using FREQUENT strategy because highway alerts can change every few minutes as incidents occur
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getAlerts: {
      function: "getAlerts",
      endpoint: "/getAlertsAsJson",
      inputSchema: i.getAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of Alert objects for all current highway incidents.",
    } satisfies EndpointDefinition<i.GetAlertsInput, o.Alert[]>,
    getAlertById: {
      function: "getAlertById",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: i.getAlertSchema,
      outputSchema: o.alertSchema,
      sampleParams: { AlertID: 468632 },
      endpointDescription:
        "Returns a single Alert object for specified AlertID.",
    } satisfies EndpointDefinition<i.GetAlertInput, o.Alert>,
    getAlertsByRegionId: {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: i.getAlertsByRegionIDSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { RegionID: 9 },
      endpointDescription:
        "Returns an array of Alert objects for specified WSDOT region.",
    } satisfies EndpointDefinition<i.GetAlertsByRegionIDInput, o.Alert[]>,
    getAlertsByMapArea: {
      function: "getAlertsByMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: i.getAlertsForMapAreaSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: { MapArea: "Seattle" },
      endpointDescription:
        "Returns an array of Alert objects for specified geographic area.",
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
        "Returns an array of Alert objects matching specified search criteria.",
    } satisfies EndpointDefinition<i.SearchAlertsInput, o.Alert[]>,
  },
};
