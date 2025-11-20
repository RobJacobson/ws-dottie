import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselStatsGroup } from "./shared/vesselStats.endpoints";
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
 * Fetch function for retrieving technical specifications for all vessels
 */
export const fetchVesselStats: FetchFactory<VesselStatsInput, VesselStat[]> =
  createFetchFunction({
    api: wsfVesselsApiMeta,
    endpoint: vesselStatsMeta,
  });

/**
 * React Query hook for retrieving technical specifications for all vessels
 */
export const useVesselStats: HookFactory<VesselStatsInput, VesselStat[]> =
  createHook({
    apiName: wsfVesselsApiMeta.name,
    endpointName: vesselStatsMeta.functionName,
    fetchFn: fetchVesselStats,
    cacheStrategy: vesselStatsGroup.cacheStrategy,
  });
