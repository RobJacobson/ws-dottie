import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselLocationsInput,
  vesselLocationsInputSchema,
} from "./shared/vesselLocations.input";
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./shared/vesselLocations.output";

/**
 * Metadata for the fetchVesselLocations endpoint
 */
export const vesselLocationsMeta = {
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current locations and status for all active vessels.",
  toolDescription: {
    purpose:
      "List real-time vessel locations and ETA/terminal assignment data.",
    useWhen: [
      "map displays",
      "live operational dashboards",
      "tracking all vessels simultaneously",
    ],
    avoidWhen: [
      "you only need one vessel (prefer fetchVesselLocationsByVesselId)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per vessel location report",
    outputHighlights: [
      "IDs: VesselID, DepartingTerminalID, ArrivingTerminalID",
      "Position: Latitude, Longitude, Speed (knots), Heading (0–359)",
      "Ops: InService, AtDock",
      "Time: TimeStamp, LeftDock, Eta, ScheduledDeparture",
      "Notes: VesselWatch* fields describe VesselWatch system status/messages",
    ],
    chaining: [
      "fetchVesselLocations → extract VesselID → call fetchVesselLocationsByVesselId",
      "fetchVesselLocations → extract VesselID → call fetchVesselBasics for names",
    ],
  },
} satisfies EndpointMeta<VesselLocationsInput, VesselLocation[]>;

/**
 * Factory result for vessel locations
 */
const vesselLocationsFactory = createFetchAndHook<
  VesselLocationsInput,
  VesselLocation[]
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselLocationsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselLocations.endpoints").vesselLocationsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current locations and status for all active vessels
 */
export const { fetch: fetchVesselLocations, hook: useVesselLocations } =
  vesselLocationsFactory;
