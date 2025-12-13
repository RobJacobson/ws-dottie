import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfVesselsApiMeta } from "../apiMeta";
import {
  type VesselStatsInput,
  vesselStatsInputSchema,
} from "./shared/vesselStats.input";
import { type VesselStat, vesselStatSchema } from "./shared/vesselStats.output";

/**
 * Metadata for the fetchVesselStats endpoint
 */
export const vesselStatsMeta = {
  functionName: "fetchVesselStats",
  endpoint: "/vesselStats",
  inputSchema: vesselStatsInputSchema,
  outputSchema: vesselStatSchema.array(),
  sampleParams: {},
  endpointDescription: "List technical specifications for all vessels.",
  toolDescription: {
    purpose: "List technical specifications for all vessels in the fleet.",
    useWhen: [
      "comparing vessel capabilities",
      "building technical reference databases",
      "analyzing fleet specifications",
    ],
    avoidWhen: ["you only need one vessel (prefer fetchVesselStatsByVesselId)"],
    inputs: [],
    returns: "array — one item per vessel",
    outputHighlights: [
      "IDs: VesselID, VesselSubjectID, VesselName, VesselAbbrev, Class info",
      "Capacity/specs: MaxPassengerCount, RegDeckSpace, TallDeckSpace, SpeedInKnots",
      "Dimensions: Length, Beam, Draft (in feet/inches), Displacement, Tonnage",
      "Power: EngineCount, Horsepower, PropulsionInfo",
      "Build: YearBuilt, YearRebuilt, CityBuilt",
      "Large text: VesselNameDesc, VesselHistory can be lengthy descriptions",
    ],
    chaining: [
      "fetchVesselBasics → extract VesselID → call fetchVesselStatsByVesselId",
    ],
  },
} satisfies EndpointMeta<VesselStatsInput, VesselStat[]>;

/**
 * Factory result for vessel stats
 */
const vesselStatsFactory = createFetchAndHook<VesselStatsInput, VesselStat[]>({
  api: wsfVesselsApiMeta,
  endpoint: vesselStatsMeta,
  getEndpointGroup: () =>
    require("./shared/vesselStats.endpoints").vesselStatsGroup,
});

/**
 * Fetch function and React Query hook for retrieving technical specifications for all vessels
 */
export const { fetch: fetchVesselStats, hook: useVesselStats } =
  vesselStatsFactory;
