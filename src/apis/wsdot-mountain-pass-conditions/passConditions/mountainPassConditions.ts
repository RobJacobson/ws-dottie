import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotMountainPassConditionsApiMeta } from "../apiMeta";
import {
  type MountainPassConditionsInput,
  mountainPassConditionsInputSchema,
} from "./shared/passConditions.input";
import {
  type PassCondition,
  passConditionSchema,
} from "./shared/passConditions.output";

/**
 * Metadata for the fetchMountainPassConditions endpoint
 */
export const mountainPassConditionsMeta = {
  functionName: "fetchMountainPassConditions",
  endpoint: "/getMountainPassConditionsAsJson",
  inputSchema: mountainPassConditionsInputSchema,
  outputSchema: passConditionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current conditions for all monitored mountain passes.",
  toolDescription: {
    purpose:
      "List current weather, road conditions, and travel restrictions for all monitored mountain passes in Washington State.",
    useWhen: [
      "planning winter travel across mountain passes",
      "monitoring statewide pass conditions and restrictions",
      "building comprehensive pass condition dashboards",
      "checking multiple passes for route planning",
    ],
    avoidWhen: [
      "you only need conditions for one specific pass (prefer fetchMountainPassConditionById)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per monitored mountain pass",
    outputHighlights: [
      "IDs: MountainPassId (unique numeric identifier)",
      "Location: MountainPassName, Latitude/Longitude coordinates, ElevationInFeet",
      "Weather: WeatherCondition (current conditions), TemperatureInFahrenheit",
      "Road: RoadCondition (surface status)",
      "Restrictions: RestrictionOne/RestrictionTwo (direction-specific travel restrictions with text)",
      "Status: TravelAdvisoryActive (true = advisory in effect), DateUpdated (last refresh)",
      "Directional data: separate restrictions for each travel direction",
      "Small dataset: ~15 monitored passes with comprehensive condition data",
    ],
    chaining: [
      "fetchMountainPassConditions → extract MountainPassId → call fetchMountainPassConditionById with { PassConditionID: ... }",
    ],
  },
} satisfies EndpointMeta<MountainPassConditionsInput, PassCondition[]>;

/**
 * Factory result for mountain pass conditions
 */
const mountainPassConditionsFactory = createFetchAndHook<
  MountainPassConditionsInput,
  PassCondition[]
>({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionsMeta,
  getEndpointGroup: () =>
    require("./shared/passConditions.endpoints").passConditionsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current conditions for all monitored mountain passes
 */
export const {
  fetch: fetchMountainPassConditions,
  hook: useMountainPassConditions,
} = mountainPassConditionsFactory;
