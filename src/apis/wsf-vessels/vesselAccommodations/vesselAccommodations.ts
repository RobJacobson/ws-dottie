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
  type VesselAccommodationsInput,
  vesselAccommodationsInputSchema,
} from "./shared/vesselAccommodations.input";
import {
  type VesselAccommodation,
  vesselAccommodationSchema,
} from "./shared/vesselAccommodations.output";

/**
 * Metadata for the fetchVesselAccommodations endpoint
 */
export const vesselAccommodationsMeta = {
  functionName: "fetchVesselAccommodations",
  endpoint: "/vesselAccommodations",
  inputSchema: vesselAccommodationsInputSchema,
  outputSchema: vesselAccommodationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List amenities and accessibility features for all vessels.",
} satisfies EndpointMeta<VesselAccommodationsInput, VesselAccommodation[]>;

/**
 * Fetch function for retrieving amenities and accessibility features for all vessels
 */
export const fetchVesselAccommodations: (
  params?: FetchFunctionParams<VesselAccommodationsInput>
) => Promise<VesselAccommodation[]> = createFetchFunction(
  wsfVesselsApi.api,
  vesselAccommodationsGroup,
  vesselAccommodationsMeta
);

/**
 * React Query hook for retrieving amenities and accessibility features for all vessels
 */
export const useVesselAccommodations: (
  params?: FetchFunctionParams<VesselAccommodationsInput>,
  options?: QueryHookOptions<VesselAccommodation[]>
) => UseQueryResult<VesselAccommodation[], Error> = createHook(
  wsfVesselsApi.api,
  vesselAccommodationsGroup,
  vesselAccommodationsMeta
);
