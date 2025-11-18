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
} from "@/shared/factories";
import { vesselLocationsGroup } from "./shared/vesselLocations.endpoints";
import {
  type VesselLocationsInput,
  vesselLocationsInputSchema,
} from "./shared/vesselLocations.input";
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./shared/vesselLocations.output";

/**
 * Metadata for the fetchVesselLocations endpoint
 */
export const vesselLocationsMeta = {
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current locations and status for all active vessels.",
} satisfies EndpointMeta<VesselLocationsInput, VesselLocation[]>;

/**
 * Fetch function for retrieving current locations and status for all active vessels
 */
export const fetchVesselLocations: (
  params?: FetchFunctionParams<VesselLocationsInput>
) => Promise<VesselLocation[]> = createFetchFunction(
  apis.wsfVessels,
  vesselLocationsGroup,
  vesselLocationsMeta
);

/**
 * React Query hook for retrieving current locations and status for all active vessels
 */
export const useVesselLocations: (
  params?: FetchFunctionParams<VesselLocationsInput>,
  options?: QueryHookOptions<VesselLocation[]>
) => UseQueryResult<VesselLocation[], Error> = createHook(
  apis.wsfVessels,
  vesselLocationsGroup,
  vesselLocationsMeta
);
