import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
 * Factory result for vessel accommodations by vessel ID
 */
const vesselAccommodationsByVesselIdFactory = createFetchAndHook<
  VesselAccommodationsByIdInput,
  VesselAccommodation
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselAccommodationsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselAccommodations.endpoints")
      .vesselAccommodationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving amenities and accessibility features for a specific vessel
 */
export const {
  fetch: fetchVesselAccommodationsByVesselId,
  hook: useVesselAccommodationsByVesselId,
} = vesselAccommodationsByVesselIdFactory;
