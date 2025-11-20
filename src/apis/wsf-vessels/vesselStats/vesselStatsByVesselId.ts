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
export const fetchVesselStatsByVesselId: FetchFactory<
  VesselStatsByIdInput,
  VesselStat
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselStatsByVesselIdMeta,
});

/**
 * React Query hook for retrieving technical specifications for a specific vessel by ID
 */
export const useVesselStatsByVesselId: HookFactory<
  VesselStatsByIdInput,
  VesselStat
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselStatsByVesselIdMeta.functionName,
  fetchFn: fetchVesselStatsByVesselId,
  cacheStrategy: vesselStatsGroup.cacheStrategy,
});
