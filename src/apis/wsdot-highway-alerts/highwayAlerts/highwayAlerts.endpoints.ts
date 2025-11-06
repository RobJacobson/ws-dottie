import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import { z } from "@/shared/zod-openapi-init";
import {
  type HighwayAlertInput,
  type HighwayAlertsByMapAreaInput,
  type HighwayAlertsByRegionIDInput,
  type HighwayAlertsInput,
  type HighwayAlertsSearchInput,
  highwayAlertInputSchema,
  highwayAlertsByMapAreaInputSchema,
  highwayAlertsByRegionIDInputSchema,
  highwayAlertsInputSchema,
  highwayAlertsSearchInputSchema,
} from "./highwayAlerts.input";
import { type Alert, highwayAlertsOutputSchema } from "./highwayAlerts.output";

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
      inputSchema: highwayAlertsInputSchema,
      outputSchema: z.array(highwayAlertsOutputSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of Alert objects for all current highway incidents.",
    } satisfies EndpointDefinition<HighwayAlertsInput, Alert[]>,
    getAlertById: {
      function: "getAlertById",
      endpoint: "/getAlertAsJson?AlertID={AlertID}",
      inputSchema: highwayAlertInputSchema,
      outputSchema: highwayAlertsOutputSchema,
      sampleParams: { AlertID: 468632 },
      endpointDescription:
        "Returns a single Alert object for specified AlertID.",
    } satisfies EndpointDefinition<HighwayAlertInput, Alert>,
    getAlertsByRegionId: {
      function: "getAlertsByRegionId",
      endpoint: "/getAlertsByRegionIDAsJson?RegionID={RegionID}",
      inputSchema: highwayAlertsByRegionIDInputSchema,
      outputSchema: z.array(highwayAlertsOutputSchema),
      sampleParams: { RegionID: 9 },
      endpointDescription:
        "Returns an array of Alert objects for specified WSDOT region.",
    } satisfies EndpointDefinition<HighwayAlertsByRegionIDInput, Alert[]>,
    getAlertsByMapArea: {
      function: "getAlertsByMapArea",
      endpoint: "/getAlertsByMapAreaAsJson?MapArea={MapArea}",
      inputSchema: highwayAlertsByMapAreaInputSchema,
      outputSchema: z.array(highwayAlertsOutputSchema),
      sampleParams: { MapArea: "Seattle" },
      endpointDescription:
        "Returns an array of Alert objects for specified geographic area.",
    } satisfies EndpointDefinition<HighwayAlertsByMapAreaInput, Alert[]>,
    searchAlerts: {
      function: "searchAlerts",
      endpoint:
        "/searchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}",
      inputSchema: highwayAlertsSearchInputSchema,
      outputSchema: z.array(highwayAlertsOutputSchema),
      sampleParams: {
        StateRoute: "405",
        StartingMilepost: 10,
        EndingMilepost: 20,
        SearchTimeStart: datesHelper.yesterday(),
        SearchTimeEnd: datesHelper.today(),
      },
      endpointDescription:
        "Returns an array of Alert objects matching specified search criteria.",
    } satisfies EndpointDefinition<HighwayAlertsSearchInput, Alert[]>,
  },
} satisfies EndpointGroup;
