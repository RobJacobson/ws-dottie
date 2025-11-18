import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
import { vesselLocationsGroup } from "./shared/vesselLocations.endpoints";
import {
  type VesselLocationsByIdInput,
  vesselLocationsByIdInputSchema,
} from "./shared/vesselLocations.input";
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./shared/vesselLocations.output";

/**
 * Metadata for the fetchVesselLocationsByVesselId endpoint
 */
export const vesselLocationsByVesselIdMeta = {
  functionName: "fetchVesselLocationsByVesselId",
  endpoint: "/vesselLocations/{VesselID}",
  inputSchema: vesselLocationsByIdInputSchema,
  outputSchema: vesselLocationSchema,
  sampleParams: { VesselID: 18 },
  endpointDescription:
    "Get current location and status for a specific vessel by ID.",
} satisfies EndpointMeta<VesselLocationsByIdInput, VesselLocation>;

/**
 * Fetch function for retrieving current location and status for a specific vessel by ID
 */
export const fetchVesselLocationsByVesselId: (
  params?: FetchFunctionParams<VesselLocationsByIdInput>
) => Promise<VesselLocation> = createFetchFunction(
  wsfVesselsApi.api,
  vesselLocationsGroup,
  vesselLocationsByVesselIdMeta
);

/**
 * React Query hook for retrieving current location and status for a specific vessel by ID
 */
export const useVesselLocationsByVesselId: (
  params?: FetchFunctionParams<VesselLocationsByIdInput>,
  options?: QueryHookOptions<VesselLocation>
) => UseQueryResult<VesselLocation, Error> = createHook(
  wsfVesselsApi.api,
  vesselLocationsGroup,
  vesselLocationsByVesselIdMeta
);
