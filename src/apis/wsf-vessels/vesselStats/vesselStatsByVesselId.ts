import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselStatsByIdInput,
  vesselStatsByIdInputSchema,
} from "./shared/vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./shared/vesselStats.output";

/**
 * Metadata for the fetchVesselStatsByVesselId endpoint
 */
export const vesselStatsByVesselIdMeta = {
  functionName: "fetchVesselStatsByVesselId",
  endpoint: "/vesselStats/{VesselID}",
  inputSchema: vesselStatsByIdInputSchema,
  outputSchema: vesselStatSchema,
  sampleParams: { VesselID: 32 },
  endpointDescription:
    "Get technical specifications for a specific vessel by ID.",
  toolDescription: {
    purpose: "Get technical specifications for a single vessel by VesselID.",
    useWhen: [
      "detailed vessel specification pages",
      "comparing specific vessel capabilities",
      "minimizing payload for single vessel details",
    ],
    avoidWhen: ["you need the entire fleet (prefer fetchVesselStats)"],
    inputs: ["VesselID: numeric ID from fetchVesselBasics → VesselID"],
    returns: "object — one vessel's complete technical profile",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class details",
      "Capacity: MaxPassengerCount, RegDeckSpace, TallDeckSpace, TallDeckClearance",
      "Performance: SpeedInKnots, Horsepower, EngineCount, PropulsionInfo",
      "Dimensions: Length, Beam, Draft (in feet/inches), Displacement, Tonnage",
      "Build: YearBuilt, YearRebuilt, CityBuilt, SolasCertified",
      "Large text: VesselNameDesc, VesselHistory can be lengthy historical info",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselStatsByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselStatsByIdInput, VesselStat>;

/**
 * Factory result for vessel stats by vessel ID
 */
const vesselStatsByVesselIdFactory = createFetchAndHook<
  VesselStatsByIdInput,
  VesselStat
>({
  api: wsfVesselsApiMeta,
  endpoint: vesselStatsByVesselIdMeta,
  getEndpointGroup: () =>
    require("./shared/vesselStats.endpoints").vesselStatsGroup,
});

/**
 * Fetch function and React Query hook for retrieving technical specifications for a specific vessel by ID
 */
export const {
  fetch: fetchVesselStatsByVesselId,
  hook: useVesselStatsByVesselId,
} = vesselStatsByVesselIdFactory;
