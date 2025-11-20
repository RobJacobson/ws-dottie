import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
export const fetchVesselAccommodationsByVesselId: FetchFactory<
  VesselAccommodationsByIdInput,
  VesselAccommodation
> = createFetchFunction({
  api: wsfVesselsApiMeta,
  endpoint: vesselAccommodationsByVesselIdMeta,
});

/**
 * React Query hook for retrieving amenities and accessibility features for a specific vessel
 */
export const useVesselAccommodationsByVesselId: HookFactory<
  VesselAccommodationsByIdInput,
  VesselAccommodation
> = createHook({
  apiName: wsfVesselsApiMeta.name,
  endpointName: vesselAccommodationsByVesselIdMeta.functionName,
  fetchFn: fetchVesselAccommodationsByVesselId,
  cacheStrategy: vesselAccommodationsGroup.cacheStrategy,
});
