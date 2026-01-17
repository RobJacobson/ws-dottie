import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
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
  toolDescription: {
    purpose: "List amenities and accessibility features for all vessels.",
    useWhen: [
      "building vessel amenity comparison tools",
      "planning accessible travel for passengers with disabilities",
      "displaying comprehensive vessel feature information",
    ],
    avoidWhen: [
      "you only need one vessel (prefer fetchVesselAccommodationsByVesselId)",
    ],
    inputs: [],
    returns: "array — one item per vessel",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class info",
      "Amenities: Elevator, ADAAccessible, MainCabinGalley, MainCabinRestroom, PublicWifi",
      "Accessibility: CarDeckRestroom, CarDeckShelter, ADAInfo (detailed text)",
      "AdditionalInfo may contain extra notes; ADAInfo can be long and detailed",
    ],
    chaining: [
      "fetchVesselAccommodations → extract VesselID → call fetchVesselAccommodationsByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselAccommodationsInput, VesselAccommodation[]>;

/**
 * Factory result for vessel accommodations
 */
const vesselAccommodationsFactory = createFetchAndHook<
  VesselAccommodationsInput,
  VesselAccommodation[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselAccommodationsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselAccommodations.endpoints")
      .vesselAccommodationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving amenities and accessibility features for all vessels
 */
export const {
  fetch: fetchVesselAccommodations,
  hook: useVesselAccommodations,
} = vesselAccommodationsFactory;
