import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselVerboseInput,
  vesselVerboseInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerbose endpoint
 */
export const vesselsVerboseMeta = {
  functionName: "fetchVesselsVerbose",
  endpoint: "/vesselVerbose",
  inputSchema: vesselVerboseInputSchema,
  outputSchema: vesselVerboseSchema.array(),
  sampleParams: {},
  endpointDescription: "List complete vessel information for all vessels.",
  toolDescription: {
    purpose:
      "List complete vessel profiles for all vessels (basics + stats + accommodations).",
    useWhen: [
      "offline snapshots",
      "one-time full export",
      "debugging schema differences",
    ],
    avoidWhen: [
      "you only need one vessel (prefer fetchVesselsVerboseByVesselId)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per vessel",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class info",
      "Status/ops: Status, OwnedByWSF",
      "Capacity/specs: MaxPassengerCount, RegDeckSpace, TallDeckSpace, SpeedInKnots",
      "Amenities: Elevator, ADAAccessible, MainCabinGalley, MainCabinRestroom, PublicWifi",
      "Dimensions: Length, Beam, Draft, Displacement, Tonnage",
      "Large text: ADAInfo, VesselNameDesc, VesselHistory can be long",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselsVerboseByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselVerboseInput, VesselVerbose[]>;

/**
 * Factory result for vessels verbose
 */
const vesselsVerboseFactory = createFetchAndHook<
  VesselVerboseInput,
  VesselVerbose[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseMeta,
  getEndpointGroup: () =>
    require("./shared/vesselVerbose.endpoints").vesselVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving complete vessel information for all vessels
 */
export const { fetch: fetchVesselsVerbose, hook: useVesselsVerbose } =
  vesselsVerboseFactory;
