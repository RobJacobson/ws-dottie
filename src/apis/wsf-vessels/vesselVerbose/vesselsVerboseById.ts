import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import { vesselVerboseGroup } from "./shared/vesselVerbose.endpoints";
import {
  type VesselVerboseByIdInput,
  vesselVerboseByIdInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerboseByVesselId endpoint
 */
export const vesselsVerboseByVesselIdMeta = {
  functionName: "fetchVesselsVerboseByVesselId",
  endpoint: "/vesselVerbose/{VesselID}",
  inputSchema: vesselVerboseByIdInputSchema,
  outputSchema: vesselVerboseSchema,
  sampleParams: { VesselID: 68 },
  endpointDescription:
    "Get complete vessel information for a specific vessel by ID.",
} satisfies EndpointMeta<VesselVerboseByIdInput, VesselVerbose>;

/**
 * Fetch function for retrieving complete vessel information for a specific vessel by ID
 */
export const fetchVesselsVerboseByVesselId: FetchFactory<
  VesselVerboseByIdInput,
  VesselVerbose
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseByVesselIdMeta,
});

/**
 * React Query hook for retrieving complete vessel information for a specific vessel by ID
 */
export const useVesselsVerboseByVesselId: HookFactory<
  VesselVerboseByIdInput,
  VesselVerbose
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselsVerboseByVesselIdMeta.functionName,
  fetchFn: fetchVesselsVerboseByVesselId,
  cacheStrategy: vesselVerboseGroup.cacheStrategy,
});
