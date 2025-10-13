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
      description:
        "Returns the date and time when the WSF vessel data data was last updated. This operation helps applications coordinate caching of vessel data that changes infrequently. When the returned date changes, applications should refresh their cached data. Data updates infrequently.",
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
      description:
        "Returns a list of VesselAccommodation data for all vessels. Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access. Data updates infrequently.",
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
      description:
        "Returns VesselAccommodation data for the vessel with the given VesselID. Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access. Data updates infrequently.",
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
      description:
        "Returns a list of VesselBasic data for all vessels. Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
    } satisfies EndpointDefinition<i.VesselBasicsInput, o.VesselBasic[]>,
    {
      function: "getVesselBasicsByVesselId",
      endpoint: "/vesselBasics/{VesselID}",
      inputSchema: i.vesselBasicsByIdSchema,
      outputSchema: o.vesselBasicSchema,
      sampleParams: { VesselID: 74 },
      cacheStrategy: "STATIC",
      description:
        "Returns VesselBasic data for the vessel with the given VesselID. Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
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
      description:
        "Returns a list of VesselHistory data for all vessels. Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.",
    } satisfies EndpointDefinition<
      i.GetAllVesselHistoryInput,
      o.VesselHistoryResponse[]
    >,
    {
      function: "getVesselHistoriesByVesselNameAndDateRange",
      endpoint: "/vesselHistory/{VesselName}/{DateStart}/{DateEnd}",
      inputSchema: i.getVesselHistorySchema,
      outputSchema: z.array(o.vesselHistoryResponseSchema),
      sampleParams: {
        VesselName: "Tacoma",
        DateStart: "2025-09-01",
        DateEnd: "2025-10-01",
      },
      cacheStrategy: "STATIC",
      description:
        "Returns a list of VesselHistory data for all vessels, filtered by VesselName, start date, and end date. Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.",
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
      description:
        "Returns a list of VesselLocation data for all vessels. Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every five seconds.",
    } satisfies EndpointDefinition<i.VesselLocationsInput, o.VesselLocations[]>,
    {
      function: "getVesselLocationsByVesselId",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: i.vesselLocationsByIdSchema,
      outputSchema: o.vesselLocationsSchema,
      sampleParams: { VesselID: 18 },
      cacheStrategy: "REALTIME",
      description:
        "Returns VesselLocation data for the vessel with the given VesselID. Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every five seconds.",
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
      description:
        "Returns a list of VesselStat data for all vessels. Each VesselStat item represents detailed vessel specifications including physical dimensions (length, beam, draft), engine specifications (count, horsepower, propulsion type), capacity information (passenger count, vehicle space), and historical details (year built, vessel history). Data updates infrequently.",
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    {
      function: "getVesselStatsByVesselId",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      cacheStrategy: "STATIC",
      description:
        "Returns VesselStat data for the vessel with the given VesselID. Each VesselStat item represents detailed vessel specifications including physical dimensions (length, beam, draft), engine specifications (count, horsepower, propulsion type), capacity information (passenger count, vehicle space), and historical details (year built, vessel history). Data updates infrequently.",
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
      description:
        "Returns a list of VesselVerbose data for all vessels. Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.",
    } satisfies EndpointDefinition<i.VesselVerboseInput, o.VesselVerbose[]>,
    {
      function: "getVesselsVerboseByVesselId",
      endpoint: "/vesselVerbose/{VesselID}",
      inputSchema: i.vesselVerboseByIdSchema,
      outputSchema: o.vesselVerboseSchema,
      sampleParams: { VesselID: 68 },
      cacheStrategy: "STATIC",
      description:
        "Returns VesselVerbose data for the vessel with the given VesselID. Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.",
    } satisfies EndpointDefinition<i.VesselVerboseByIdInput, o.VesselVerbose>,
  ],
};
