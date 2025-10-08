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
      function: "cacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.cacheFlushDateSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.VesselsCacheFlushDateInput,
      o.VesselsCacheFlushDate
    >,
    /**
     * VesselAccommodations response
     */
    {
      function: "vesselAccommodations",
      endpoint: "/vesselAccommodations",
      inputSchema: i.vesselAccommodationsSchema,
      outputSchema: z.array(o.vesselAccommodationsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsInput,
      o.VesselAccommodations[]
    >,
    {
      function: "vesselAccommodationsById",
      endpoint: "/vesselAccommodations/{VesselID}",
      inputSchema: i.vesselAccommodationsByIdSchema,
      outputSchema: o.vesselAccommodationsSchema,
      sampleParams: { VesselID: 65 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.VesselAccommodationsByIdInput,
      o.VesselAccommodations
    >,
    /**
     * VesselBasics response
     */
    {
      function: "vesselBasics",
      endpoint: "/vesselBasics",
      inputSchema: i.vesselBasicsSchema,
      outputSchema: z.array(o.vesselBasicSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselBasicsInput, o.VesselBasic[]>,
    {
      function: "vesselBasicsById",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: i.vesselBasicsByIdSchema,
      outputSchema: o.vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselBasicsByIdInput, o.VesselBasic>,
    /**
     * VesselHistories response
     */
    {
      function: "vesselHistories",
      endpoint: "/vesselHistory",
      inputSchema: i.getAllVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.GetAllVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    {
      function: "vesselHistoriesByVesselAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.GetVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    /**
     * VesselLocations response
     */
    {
      function: "vesselLocations",
      endpoint: "/vesselLocations",
      inputSchema: i.vesselLocationsSchema,
      outputSchema: z.array(o.vesselLocationsSchema),
      sampleParams: {},
      cacheStrategy: "REALTIME",
    } satisfies EndpointDefinition<i.VesselLocationsInput, o.VesselLocations[]>,
    {
      function: "vesselLocationsById",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: i.vesselLocationsByIdSchema,
      outputSchema: o.vesselLocationsSchema,
      sampleParams: { VesselID: 18 },
      cacheStrategy: "REALTIME",
    } satisfies EndpointDefinition<
      i.VesselLocationsByIdInput,
      o.VesselLocations
    >,
    /**
     * VesselStats response
     */
    {
      function: "vesselStats",
      endpoint: "/vesselStats",
      inputSchema: i.vesselStatsSchema,
      outputSchema: z.array(o.vesselStatsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    {
      function: "vesselStatsById",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStats>,
    /**
     * VesselsVerbose response
     */
    {
      function: "vesselsVerbose",
      endpoint: "/vesselVerbose",
      inputSchema: i.vesselVerboseSchema,
      outputSchema: z.array(o.vesselVerboseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    {
      function: "vesselsVerboseById",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  ],
};
