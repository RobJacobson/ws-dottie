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
  type VesselBasicsByIdInput,
  vesselBasicsByIdInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasicsByVesselId endpoint
 */
export const vesselBasicsByVesselIdMeta = {
  functionName: "fetchVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  inputSchema: vesselBasicsByIdInputSchema,
  outputSchema: vesselBasicSchema,
  sampleParams: { VesselID: 74 },
  endpointDescription: "Get basic information for a specific vessel by ID.",
} satisfies EndpointMeta<VesselBasicsByIdInput, VesselBasic>;

/**
 * Fetch function for retrieving basic information for a specific vessel by ID
 */
export const fetchVesselBasicsByVesselId: FetchFactory<
  VesselBasicsByIdInput,
  VesselBasic
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsByVesselIdMeta,
});

/**
 * React Query hook for retrieving basic information for a specific vessel by ID
 */
export const useVesselBasicsByVesselId: HookFactory<
  VesselBasicsByIdInput,
  VesselBasic
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselBasicsByVesselIdMeta.functionName,
  fetchFn: fetchVesselBasicsByVesselId,
  cacheStrategy: vesselBasicsGroup.cacheStrategy,
});
