import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselBasicsInput,
  vesselBasicsInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasics endpoint
 */
export const vesselBasicsMeta = {
  functionName: "fetchVesselBasics",
  endpoint: "/vesselBasics",
  inputSchema: vesselBasicsInputSchema,
  outputSchema: vesselBasicSchema.array(),
  sampleParams: {},
  endpointDescription: "List basic information for all vessels in the fleet.",
  toolDescription: {
    purpose:
      "List basic vessel identification and operational status for the fleet.",
    useWhen: [
      "discovering VesselID values",
      "building vessel pickers",
      "light status checks",
    ],
    avoidWhen: [
      "you need full vessel specs/amenities (prefer fetchVesselAccommodationsByVesselId)",
    ],
    inputs: [],
    returns: "array — one item per vessel",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID",
      "Names: VesselName, VesselAbbrev",
      "Class: Class.ClassID, Class.PublicDisplayName",
      "Status: Status (1=in service, 2=maintenance, 3=out of service)",
      "Ownership: OwnedByWSF",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselBasicsByVesselId",
      "fetchVesselBasics → extract VesselID → call fetchVesselAccommodationsByVesselId",
      "fetchVesselBasics → extract VesselID → call fetchVesselStatsByVesselId",
      "fetchVesselBasics → extract VesselID → call fetchVesselLocationsByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselBasicsInput, VesselBasic[]>;

/**
 * Factory result for vessel basics
 */
const vesselBasicsFactory = createFetchAndHook<
  VesselBasicsInput,
  VesselBasic[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselBasics.endpoints").vesselBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for all vessels in the fleet
 */
export const { fetch: fetchVesselBasics, hook: useVesselBasics } =
  vesselBasicsFactory;
