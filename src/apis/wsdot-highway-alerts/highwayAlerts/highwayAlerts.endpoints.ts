import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import {
  type AlertByIdInput,
  type AlertsByMapAreaInput,
  type AlertsByRegionIDInput,
  type AlertsInput,
  alertByIdInputSchema,
  alertsByMapAreaInputSchema,
  alertsByRegionIDInputSchema,
  alertsInputSchema,
  type SearchAlertsInput,
  searchAlertsInputSchema,
} from "./highwayAlerts.input";
import { type Alert, alertSchema } from "./highwayAlerts.output";

export const highwayAlertsGroup = {
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
      inputSchema: alertsInputSchema,
      outputSchema: z.array(alertSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of Alert objects for all current highway incidents.",
    } satisfies EndpointDefinition<AlertsInput, Alert[]>,
    getAlertById: {
      function: "getAlertById",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: alertByIdInputSchema,
      outputSchema: alertSchema,
      sampleParams: { AlertID: 468632 },
      endpointDescription:
        "Returns a single Alert object for specified AlertID.",
    } satisfies EndpointDefinition<AlertByIdInput, Alert>,
    getAlertsByRegionId: {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: alertsByRegionIDInputSchema,
      outputSchema: z.array(alertSchema),
      sampleParams: { RegionID: 9 },
      endpointDescription:
        "Returns an array of Alert objects for specified WSDOT region.",
    } satisfies EndpointDefinition<AlertsByRegionIDInput, Alert[]>,
    getAlertsByMapArea: {
      function: "getAlertsByMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: alertsByMapAreaInputSchema,
      outputSchema: z.array(alertSchema),
      sampleParams: { MapArea: "Seattle" },
      endpointDescription:
        "Returns an array of Alert objects for specified geographic area.",
    } satisfies EndpointDefinition<AlertsByMapAreaInput, Alert[]>,
    searchAlerts: {
      function: "searchAlerts",
      endpoint:
        "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
      inputSchema: searchAlertsInputSchema,
      outputSchema: z.array(alertSchema),
      sampleParams: {
        StateRoute: "405",
        StartingMilepost: 10,
        EndingMilepost: 20,
        SearchTimeStart: datesHelper.yesterday(),
        SearchTimeEnd: datesHelper.today(),
      },
      endpointDescription:
        "Returns an array of Alert objects matching specified search criteria.",
    } satisfies EndpointDefinition<SearchAlertsInput, Alert[]>,
  },
} satisfies EndpointGroup;
