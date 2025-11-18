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
export const fetchVesselsVerboseByVesselId: (
  params?: FetchFunctionParams<VesselVerboseByIdInput>
) => Promise<VesselVerbose> = createFetchFunction(
  wsfVesselsApi,
  vesselVerboseGroup,
  vesselsVerboseByVesselIdMeta
);

/**
 * React Query hook for retrieving complete vessel information for a specific vessel by ID
 */
export const useVesselsVerboseByVesselId: (
  params?: FetchFunctionParams<VesselVerboseByIdInput>,
  options?: QueryHookOptions<VesselVerbose>
) => UseQueryResult<VesselVerbose, Error> = createHook(
  wsfVesselsApi,
  vesselVerboseGroup,
  vesselsVerboseByVesselIdMeta
);
