import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselBasicsByIdInput,
  vesselBasicsByIdInputSchema,
} from "./shared/vesselBasics.input";
import {
  type VesselBasic,
  vesselBasicSchema,
} from "./shared/vesselBasics.output";

/**
 * Metadata for the fetchVesselBasicsByVesselId endpoint
 */
export const vesselBasicsByVesselIdMeta = {
  functionName: "fetchVesselBasicsByVesselId",
  endpoint: "/vesselBasics/{VesselID}",
  inputSchema: vesselBasicsByIdInputSchema,
  outputSchema: vesselBasicSchema,
  sampleParams: { VesselID: 74 },
  endpointDescription: "Get basic information for a specific vessel by ID.",
  toolDescription: {
    purpose:
      "Get basic vessel identification and status for a single vessel by VesselID.",
    useWhen: [
      "displaying vessel info for a selected ferry",
      "enriching vessel data with basic identification",
      "checking operational status of a specific vessel",
    ],
    avoidWhen: ["you need the entire fleet (prefer fetchVesselBasics)"],
    inputs: ["VesselID: numeric ID from fetchVesselBasics → VesselID"],
    returns: "object — one vessel's basic profile",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID",
      "Names: VesselName, VesselAbbrev",
      "Class: Class.ClassID, Class.ClassName, Class.PublicDisplayName",
      "Status: Status (1=in service, 2=maintenance, 3=out of service)",
      "Ownership: OwnedByWSF",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselBasicsByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselBasicsByIdInput, VesselBasic>;

/**
 * Factory result for vessel basics by vessel ID
 */
const vesselBasicsByVesselIdFactory = createFetchAndHook<
  VesselBasicsByIdInput,
  VesselBasic
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselBasicsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselBasics.endpoints").vesselBasicsGroup,
});

/**
 * Fetch function and React Query hook for retrieving basic information for a specific vessel by ID
 */
export const {
  fetch: fetchVesselBasicsByVesselId,
  hook: useVesselBasicsByVesselId,
} = vesselBasicsByVesselIdFactory;
