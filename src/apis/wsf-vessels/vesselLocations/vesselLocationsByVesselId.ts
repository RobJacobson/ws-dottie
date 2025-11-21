import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
 * Factory result for vessel locations by vessel ID
 */
const vesselLocationsByVesselIdFactory = createFetchAndHook<
  VesselLocationsByIdInput,
  VesselLocation
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselLocationsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselLocations.endpoints").vesselLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current location and status for a specific vessel by ID
 */
export const {
  fetch: fetchVesselLocationsByVesselId,
  hook: useVesselLocationsByVesselId,
} = vesselLocationsByVesselIdFactory;
