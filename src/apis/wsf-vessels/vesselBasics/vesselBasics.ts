import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselBasicsGroup } from "./shared/vesselBasics.endpoints";
import {
  type VesselBasicsInput,
  vesselBasicsInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasics endpoint
 */
export const vesselBasicsMeta = {
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all vessels in the fleet.",
} satisfies EndpointMeta<VesselBasicsInput, VesselBasic[]>;

/**
 * Fetch function for retrieving basic information for all vessels in the fleet
 */
export const fetchVesselBasics: FetchFactory<VesselBasicsInput, VesselBasic[]> =
  createFetchFunction({
    api: wsfVesselsApiMeta,
    endpoint: vesselBasicsMeta,
  });

/**
 * React Query hook for retrieving basic information for all vessels in the fleet
 */
export const useVesselBasics: HookFactory<VesselBasicsInput, VesselBasic[]> =
  createHook({
    apiName: wsfVesselsApiMeta.name,
    endpointName: vesselBasicsMeta.functionName,
    fetchFn: fetchVesselBasics,
    cacheStrategy: vesselBasicsGroup.cacheStrategy,
  });
