import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchVesselStats: (
  params?: FetchFunctionParams<VesselStatsInput>
) => Promise<VesselStat[]> = createFetchFunction(
  apis.wsfVessels,
  vesselStatsGroup,
  vesselStatsMeta
);

/**
 * React Query hook for retrieving technical specifications for all vessels
 */
export const useVesselStats: (
  params?: FetchFunctionParams<VesselStatsInput>,
  options?: QueryHookOptions<VesselStat[]>
) => UseQueryResult<VesselStat[], Error> = createHook(
  apis.wsfVessels,
  vesselStatsGroup,
  vesselStatsMeta
);
