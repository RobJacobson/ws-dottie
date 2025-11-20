import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
export const fetchVesselLocationsByVesselId: FetchFactory<
  VesselLocationsByIdInput,
  VesselLocation
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselLocationsByVesselIdMeta,
});

/**
 * React Query hook for retrieving current location and status for a specific vessel by ID
 */
export const useVesselLocationsByVesselId: HookFactory<
  VesselLocationsByIdInput,
  VesselLocation
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselLocationsByVesselIdMeta.functionName,
  fetchFn: fetchVesselLocationsByVesselId,
  cacheStrategy: vesselLocationsGroup.cacheStrategy,
});
