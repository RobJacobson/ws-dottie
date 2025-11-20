import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselHistoriesGroup } from "./shared/vesselHistories.endpoints";
import {
  type VesselHistoriesInput,
  vesselHistoriesInputSchema,
} from "./shared/vesselHistories.input";
import {
  type VesselHistory,
  vesselHistorySchema,
} from "./shared/vesselHistories.output";

/**
 * Metadata for the fetchVesselHistories endpoint
 */
export const vesselHistoriesMeta = {
  functionName: "fetchVesselHistories",
  endpoint: "/vesselHistory",
  inputSchema: vesselHistoriesInputSchema,
  outputSchema: vesselHistorySchema.array(),
  sampleParams: {},
  endpointDescription: "List historical sailing records for all vessels.",
} satisfies EndpointMeta<VesselHistoriesInput, VesselHistory[]>;

/**
 * Fetch function for retrieving historical sailing records for all vessels
 */
export const fetchVesselHistories: FetchFactory<
  VesselHistoriesInput,
  VesselHistory[]
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselHistoriesMeta,
});

/**
 * React Query hook for retrieving historical sailing records for all vessels
 */
export const useVesselHistories: HookFactory<
  VesselHistoriesInput,
  VesselHistory[]
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselHistoriesMeta.functionName,
  fetchFn: fetchVesselHistories,
  cacheStrategy: vesselHistoriesGroup.cacheStrategy,
});
