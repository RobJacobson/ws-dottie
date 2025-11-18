import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
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
  wsfVesselsApi.api,
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
  wsfVesselsApi.api,
  vesselVerboseGroup,
  vesselsVerboseMeta
);
