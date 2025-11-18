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
export const fetchVesselsVerbose: (
  params?: FetchFunctionParams<VesselVerboseInput>
) => Promise<VesselVerbose[]> = createFetchFunction(
  apis.wsfVessels,
  vesselVerboseGroup,
  vesselsVerboseMeta
);

/**
 * React Query hook for retrieving complete vessel information for all vessels
 */
export const useVesselsVerbose: (
  params?: FetchFunctionParams<VesselVerboseInput>,
  options?: QueryHookOptions<VesselVerbose[]>
) => UseQueryResult<VesselVerbose[], Error> = createHook(
  apis.wsfVessels,
  vesselVerboseGroup,
  vesselsVerboseMeta
);
