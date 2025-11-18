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
} from "@/shared/factories";
import { vesselStatsGroup } from "./shared/vesselStats.endpoints";
import {
  type VesselStatsByIdInput,
  vesselStatsByIdInputSchema,
} from "./shared/vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./shared/vesselStats.output";

/**
 * Metadata for the fetchVesselStatsByVesselId endpoint
 */
export const vesselStatsByVesselIdMeta = {
  functionName: "fetchVesselStatsByVesselId",
  endpoint: "/vesselStats/{VesselID}",
  inputSchema: vesselStatsByIdInputSchema,
  outputSchema: vesselStatSchema,
  sampleParams: { VesselID: 32 },
  endpointDescription:
    "Get technical specifications for a specific vessel by ID.",
} satisfies EndpointMeta<VesselStatsByIdInput, VesselStat>;

/**
 * Fetch function for retrieving technical specifications for a specific vessel by ID
 */
export const fetchVesselStatsByVesselId: (
  params?: FetchFunctionParams<VesselStatsByIdInput>
) => Promise<VesselStat> = createFetchFunction(
  apis.wsfVessels,
  vesselStatsGroup,
  vesselStatsByVesselIdMeta
);

/**
 * React Query hook for retrieving technical specifications for a specific vessel by ID
 */
export const useVesselStatsByVesselId: (
  params?: FetchFunctionParams<VesselStatsByIdInput>,
  options?: QueryHookOptions<VesselStat>
) => UseQueryResult<VesselStat, Error> = createHook(
  apis.wsfVessels,
  vesselStatsGroup,
  vesselStatsByVesselIdMeta
);
