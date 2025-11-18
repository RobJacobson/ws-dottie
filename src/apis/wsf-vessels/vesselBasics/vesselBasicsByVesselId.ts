import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
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
export const fetchVesselBasicsByVesselId: (
  params?: FetchFunctionParams<VesselBasicsByIdInput>
) => Promise<VesselBasic> = createFetchFunction(
  wsfVesselsApi,
  vesselBasicsGroup,
  vesselBasicsByVesselIdMeta
);

/**
 * React Query hook for retrieving basic information for a specific vessel by ID
 */
export const useVesselBasicsByVesselId: (
  params?: FetchFunctionParams<VesselBasicsByIdInput>,
  options?: QueryHookOptions<VesselBasic>
) => UseQueryResult<VesselBasic, Error> = createHook(
  wsfVesselsApi,
  vesselBasicsGroup,
  vesselBasicsByVesselIdMeta
);
