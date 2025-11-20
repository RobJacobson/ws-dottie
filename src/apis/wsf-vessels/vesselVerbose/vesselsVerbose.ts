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
  type VesselVerboseInput,
  vesselVerboseInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerbose endpoint
 */
export const vesselsVerboseMeta = {
  functionName: "fetchVesselsVerbose",
  endpoint: "/vesselVerbose",
  inputSchema: vesselVerboseInputSchema,
  outputSchema: vesselVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List complete vessel information for all vessels.",
} satisfies EndpointMeta<VesselVerboseInput, VesselVerbose[]>;

/**
 * Fetch function for retrieving complete vessel information for all vessels
 */
export const fetchVesselsVerbose: FetchFactory<
  VesselVerboseInput,
  VesselVerbose[]
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseMeta,
});

/**
 * React Query hook for retrieving complete vessel information for all vessels
 */
export const useVesselsVerbose: HookFactory<
  VesselVerboseInput,
  VesselVerbose[]
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselsVerboseMeta.functionName,
  fetchFn: fetchVesselsVerbose,
  cacheStrategy: vesselVerboseGroup.cacheStrategy,
});
