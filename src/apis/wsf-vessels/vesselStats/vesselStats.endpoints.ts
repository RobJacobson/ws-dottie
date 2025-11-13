import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfVesselsApi } from "../apiDefinition";
import {
  type VesselStatsByIdInput,
  type VesselStatsInput,
  vesselStatsByIdInputSchema,
  vesselStatsInputSchema,
} from "./vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./vesselStats.output";

const group = defineEndpointGroup({
  api: wsfVesselsApi,
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
  group,
  functionName: "fetchVesselStats",
  definition: {
    endpoint: "/vesselStats",
    inputSchema: vesselStatsInputSchema,
    outputSchema: vesselStatSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple VesselStat objects for all vessels in the fleet.",
  },
});

export const fetchVesselStatsByVesselId = defineEndpoint<
  VesselStatsByIdInput,
  VesselStat
>({
  group,
  functionName: "fetchVesselStatsByVesselId",
  definition: {
    endpoint: "/vesselStats/{VesselID}",
    inputSchema: vesselStatsByIdInputSchema,
    outputSchema: vesselStatSchema,
    sampleParams: { VesselID: 32 },
    endpointDescription:
      "Returns a VesselStat object containing detailed technical specifications and performance characteristics for the specified vessel.",
  },
});

export const vesselStatsResource = group.descriptor;
