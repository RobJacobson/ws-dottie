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
  toolDescription: {
    purpose: "Get amenities and accessibility features for a specific vessel.",
    useWhen: [
      "displaying vessel amenities for a selected ferry",
      "checking accessibility features for trip planning",
      "showing detailed accommodation information",
    ],
    avoidWhen: ["you need all vessels (prefer fetchVesselAccommodations)"],
    inputsHighlights:
      "VesselID (get it from fetchVesselAccommodations → VesselID)",
    returns: "object — one vessel's accommodation profile",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class details",
      "Amenities: Elevator, ADAAccessible, MainCabinGalley, MainCabinRestroom, PublicWifi",
      "Accessibility: CarDeckRestroom, CarDeckShelter, ADAInfo (detailed accessibility text)",
      "AdditionalInfo may contain extra notes; ADAInfo can be lengthy",
    ],
    chaining: [
      "fetchVesselAccommodations → extract VesselID → call fetchVesselAccommodationsByVesselId",
    ],
  },
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
