import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselVerboseByIdInput,
  vesselVerboseByIdInputSchema,
} from "./shared/vesselVerbose.input";
import {
  type VesselVerbose,
  vesselVerboseSchema,
} from "./shared/vesselVerbose.output";

/**
 * Metadata for the fetchVesselsVerboseByVesselId endpoint
 */
export const vesselsVerboseByVesselIdMeta = {
  functionName: "fetchVesselsVerboseByVesselId",
  endpoint: "/vesselVerbose/{VesselID}",
  inputSchema: vesselVerboseByIdInputSchema,
  outputSchema: vesselVerboseSchema,
  sampleParams: { VesselID: 68 },
  endpointDescription:
    "Get complete vessel information for a specific vessel by ID.",
  toolDescription: {
    purpose: "Get the complete vessel profile for a single vessel by VesselID.",
    useWhen: [
      "detailed vessel pages",
      "enriching a selected vessel",
      "minimizing payload size",
    ],
    avoidWhen: ["you need the entire fleet (prefer fetchVesselsVerbose)"],
    inputs: ["VesselID: numeric ID from fetchVesselBasics → VesselID"],
    returns: "object — one vessel profile",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class info",
      "Status/ops: Status, OwnedByWSF",
      "Specs/amenities: combines stats + accommodations in single object",
      "Capacity: MaxPassengerCount, vehicle spaces, passenger facilities",
      "Technical: dimensions, engines, speed, build details",
      "Large text: ADAInfo, VesselNameDesc, VesselHistory may be long",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselsVerboseByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselVerboseByIdInput, VesselVerbose>;

/**
 * Factory result for vessels verbose by vessel ID
 */
const vesselsVerboseByVesselIdFactory = createFetchAndHook<
  VesselVerboseByIdInput,
  VesselVerbose
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselsVerboseByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselVerbose.endpoints").vesselVerboseGroup,
});

/**
 * Fetch function and React Query hook for retrieving complete vessel information for a specific vessel by ID
 */
export const {
  fetch: fetchVesselsVerboseByVesselId,
  hook: useVesselsVerboseByVesselId,
} = vesselsVerboseByVesselIdFactory;
