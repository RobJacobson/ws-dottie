import type { UseQueryResult } from "@tanstack/react-query";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import { createFetchFunction, createHook } from "@/shared/factories";
import { wsfVesselsApi } from "../api";
import { vesselAccommodationsGroup } from "./shared/vesselAccommodations.endpoints";
import {
  type VesselAccommodationsByIdInput,
  vesselAccommodationsByIdInputSchema,
} from "./shared/vesselAccommodations.input";
import {
  type VesselAccommodation,
  vesselAccommodationSchema,
} from "./shared/vesselAccommodations.output";

/**
 * Metadata for the fetchVesselAccommodationsByVesselId endpoint
 */
export const vesselAccommodationsByVesselIdMeta = {
  functionName: "fetchVesselAccommodationsByVesselId",
  endpoint: "/vesselAccommodations/{VesselID}",
  inputSchema: vesselAccommodationsByIdInputSchema,
  outputSchema: vesselAccommodationSchema,
  sampleParams: { VesselID: 65 },
  endpointDescription:
    "Get amenities and accessibility features for a specific vessel.",
} satisfies EndpointMeta<VesselAccommodationsByIdInput, VesselAccommodation>;

/**
 * Fetch function for retrieving amenities and accessibility features for a specific vessel
 */
export const fetchVesselAccommodationsByVesselId: (
  params?: FetchFunctionParams<VesselAccommodationsByIdInput>
) => Promise<VesselAccommodation> = createFetchFunction(
  wsfVesselsApi,
  vesselAccommodationsGroup,
  vesselAccommodationsByVesselIdMeta
);

/**
 * React Query hook for retrieving amenities and accessibility features for a specific vessel
 */
export const useVesselAccommodationsByVesselId: (
  params?: FetchFunctionParams<VesselAccommodationsByIdInput>,
  options?: QueryHookOptions<VesselAccommodation>
) => UseQueryResult<VesselAccommodation, Error> = createHook(
  wsfVesselsApi,
  vesselAccommodationsGroup,
  vesselAccommodationsByVesselIdMeta
);
