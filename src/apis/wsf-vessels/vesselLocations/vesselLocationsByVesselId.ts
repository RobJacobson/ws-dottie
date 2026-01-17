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
  toolDescription: {
    purpose:
      "Get real-time location and status for a single vessel by VesselID.",
    useWhen: [
      "tracking a specific ferry",
      "getting detailed location data for one vessel",
      "minimizing payload size for single vessel tracking",
    ],
    avoidWhen: [
      "you need all vessels (bulk fetchVesselLocations is more efficient)",
    ],
    inputs: ["VesselID: numeric ID from fetchVesselBasics → VesselID"],
    returns: "object — one vessel's real-time location data",
    outputHighlights: [
      "IDs: VesselID, DepartingTerminalID, ArrivingTerminalID",
      "Position: Latitude, Longitude, Speed (knots), Heading (0–359)",
      "Ops: InService, AtDock, ManagedBy (1=WSF, 2=KCM)",
      "Time: TimeStamp, LeftDock, Eta, ScheduledDeparture (all UTC)",
      "Routes: OpRouteAbbrev array, VesselPositionNum",
      "Notes: VesselWatch* fields provide system status and messages",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselLocationsByVesselId",
    ],
  },
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
