import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsfVesselsApi: ApiDefinition = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  endpoints: [
    /**
     * CacheFlushDate response
     */
    {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.cacheFlushDateSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.VesselsCacheFlushDateInput,
      o.VesselsCacheFlushDate
    >,
    /**
     * VesselAccommodations response
     */
    {
      function: "getVesselAccommodations",
      endpoint: "/vesselAccommodations",
      inputSchema: i.vesselAccommodationsSchema,
      outputSchema: z.array(o.vesselAccommodationsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsInput,
      o.VesselAccommodations[]
    >,
    {
      function: "getVesselAccommodationsByVesselId",
      endpoint: "/vesselAccommodations/{VesselID}",
      inputSchema: i.vesselAccommodationsByIdSchema,
      outputSchema: o.vesselAccommodationsSchema,
      sampleParams: { VesselID: 65 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsByIdInput,
      o.VesselAccommodations
    >,
    /**
     * VesselBasics response
     */
    {
      function: "getVesselBasics",
      endpoint: "/vesselBasics",
      inputSchema: i.vesselBasicsSchema,
      outputSchema: z.array(o.vesselBasicSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselBasicsInput, o.VesselBasic[]>,
    {
      function: "getVesselBasicsById",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: i.vesselBasicsByIdSchema,
      outputSchema: o.vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselBasicsByIdInput, o.VesselBasic>,
    /**
     * VesselHistories response
     */
    {
      function: "getVesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.GetAllVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    {
      function: "getVesselHistoriesByVesselAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.GetVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    /**
     * VesselLocations response
     */
    {
      function: "getVesselLocations",
      endpoint: "/vesselLocations",
      inputSchema: i.vesselLocationsSchema,
      outputSchema: z.array(o.vesselLocationsSchema),
      sampleParams: {},
      cacheStrategy: "REALTIME",
      description: "",
    } satisfies EndpointDefinition<i.VesselLocationsInput, o.VesselLocations[]>,
    {
      function: "getVesselLocationsById",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: i.vesselLocationsByIdSchema,
      outputSchema: o.vesselLocationsSchema,
      sampleParams: { VesselID: 18 },
      cacheStrategy: "REALTIME",
      description: "",
    } satisfies EndpointDefinition<
      i.VesselLocationsByIdInput,
      o.VesselLocations
    >,
    /**
     * VesselStats response
     */
    {
      function: "getVesselStats",
      endpoint: "/vesselStats",
      inputSchema: i.vesselStatsSchema,
      outputSchema: z.array(o.vesselStatsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    {
      function: "getVesselStatsById",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStats>,
    /**
     * VesselsVerbose response
     */
    {
      function: "getVesselsVerbose",
      endpoint: "/vesselVerbose",
      inputSchema: i.vesselVerboseSchema,
      outputSchema: z.array(o.vesselVerboseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    {
      function: "getVesselsVerboseById",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  ],
};
