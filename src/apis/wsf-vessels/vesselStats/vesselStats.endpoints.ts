import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  type VesselStatsByIdInput,
  type VesselStatsInput,
  vesselStatsByIdInputSchema,
  vesselStatsInputSchema,
} from "./vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./vesselStats.output";

export const vesselStatsGroup: EndpointGroup = {
  name: "vessel-stats",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Technical specifications and capacity data for WSF vessels.",
    description:
      "Physical dimensions, engine details, passenger and vehicle capacity, and construction information. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Compare vessel capabilities and specifications.",
      "Plan capacity and route assignments.",
      "Support maintenance and technical reference.",
    ],
  },
};

export const fetchVesselStats = createEndpoint<VesselStatsInput, VesselStat[]>({
  api: apis.wsfVessels,
  group: vesselStatsGroup,
  functionName: "fetchVesselStats",
  endpoint: "/vesselStats",
  inputSchema: vesselStatsInputSchema,
  outputSchema: vesselStatSchema.array(),
  sampleParams: {},
  endpointDescription: "List technical specifications for all vessels.",
});

export const fetchVesselStatsByVesselId = createEndpoint<
  VesselStatsByIdInput,
  VesselStat
>({
  api: apis.wsfVessels,
  group: vesselStatsGroup,
  functionName: "fetchVesselStatsByVesselId",
  endpoint: "/vesselStats/{VesselID}",
  inputSchema: vesselStatsByIdInputSchema,
  sampleParams: { VesselID: 32 },
  outputSchema: vesselStatSchema,
  endpointDescription:
    "Get technical specifications for a specific vessel by ID.",
});
