import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import {
  type VesselStatsByIdInput,
  type VesselStatsInput,
  vesselStatsByIdInputSchema,
  vesselStatsInputSchema,
} from "./vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./vesselStats.output";

export const vesselStatsGroup = defineEndpointGroup({
  name: "vessel-stats",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each VesselStat item represents technical specifications and capacity data for Washington State Ferries vessels. These items include physical dimensions, engine details, passenger and vehicle capacity, and construction information for each vessel in the fleet.",
    businessContext:
      "Use to compare vessel capabilities and plan capacity by providing technical specifications and capacity data for fleet management applications. Supports vessel selection tools and maintenance planning systems for Washington State Ferry services.",
  },
});

export const fetchVesselStats = defineEndpoint<VesselStatsInput, VesselStat[]>({
  api: API,
  group: vesselStatsGroup,
  functionName: "fetchVesselStats",
  endpoint: "/vesselStats",
  inputSchema: vesselStatsInputSchema,
  outputSchema: vesselStatSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple VesselStat objects for all vessels in the fleet.",
});

export const fetchVesselStatsByVesselId = defineEndpoint<
  VesselStatsByIdInput,
  VesselStat
>({
  api: API,
  group: vesselStatsGroup,
  functionName: "fetchVesselStatsByVesselId",
  endpoint: "/vesselStats/{VesselID}",
  inputSchema: vesselStatsByIdInputSchema,
  sampleParams: { VesselID: 32 },
  outputSchema: vesselStatSchema,
  endpointDescription:
    "Returns a VesselStat object containing detailed technical specifications and performance characteristics for the specified vessel.",
});
