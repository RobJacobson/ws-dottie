import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselStatsInput,
  vesselStatsInputSchema,
} from "./shared/vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./shared/vesselStats.output";

/**
 * Metadata for the fetchVesselStats endpoint
 */
export const vesselStatsMeta = {
  functionName: "fetchVesselStats",
  endpoint: "/vesselStats",
  inputSchema: vesselStatsInputSchema,
  outputSchema: vesselStatSchema.array(),
  sampleParams: {},
  endpointDescription: "List technical specifications for all vessels.",
} satisfies EndpointMeta<VesselStatsInput, VesselStat[]>;

/**
 * Factory result for vessel stats
 */
const vesselStatsFactory = createFetchAndHook<VesselStatsInput, VesselStat[]>({
  api: wsfVesselsApiMeta,
  endpoint: vesselStatsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselStats.endpoints").vesselStatsGroup,
});

/**
 * Fetch function and React Query hook for retrieving technical specifications for all vessels
 */
export const { fetch: fetchVesselStats, hook: useVesselStats } =
  vesselStatsFactory;
