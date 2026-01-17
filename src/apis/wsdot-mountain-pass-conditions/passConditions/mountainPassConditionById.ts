import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotMountainPassConditionsApiMeta } from "../apiMeta";
import {
  type MountainPassConditionByIdInput,
  mountainPassConditionByIdInputSchema,
} from "./shared/passConditions.input";
import {
  type PassCondition,
  passConditionSchema,
} from "./shared/passConditions.output";

/**
 * Metadata for the fetchMountainPassConditionById endpoint
 */
export const mountainPassConditionByIdMeta = {
  functionName: "fetchMountainPassConditionById",
  endpoint: "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}", // Typo in original url
  inputSchema: mountainPassConditionByIdInputSchema,
  outputSchema: passConditionSchema,
  sampleParams: { PassConditionID: 12 },
  endpointDescription:
    "Get current conditions for a specific mountain pass by ID.",
  toolDescription: {
    purpose:
      "Get complete current conditions and travel restrictions for a single mountain pass by its unique ID.",
    useWhen: [
      "getting detailed conditions for a specific pass",
      "enriching pass data from bulk queries",
      "displaying individual pass detail pages",
      "checking conditions before traveling a specific pass",
      "minimizing payload when you only need one pass",
    ],
    avoidWhen: [
      "you need conditions for multiple passes (prefer fetchMountainPassConditions)",
      "you don't have a PassConditionID (prefer fetchMountainPassConditions to discover IDs)",
    ],
    inputs: [
      "PassConditionID: numeric ID from bulk queries like fetchMountainPassConditions → MountainPassId",
    ],
    returns: "object — complete conditions for one mountain pass",
    outputHighlights: [
      "IDs: MountainPassId, links to location data",
      "Location: MountainPassName, Latitude/Longitude coordinates, ElevationInFeet",
      "Weather: WeatherCondition (current conditions), TemperatureInFahrenheit",
      "Road: RoadCondition (surface status like 'Snow Packed', 'Ice')",
      "Restrictions: RestrictionOne/RestrictionTwo (direction-specific with TravelDirection and RestrictionText)",
      "Status: TravelAdvisoryActive (true = advisory in effect), DateUpdated (last refresh time)",
      "Directional safety: separate restrictions for each travel direction",
      "Complete details: includes all available weather, road, and restriction information",
    ],
    chaining: [
      "fetchMountainPassConditions → extract MountainPassId → call fetchMountainPassConditionById with { PassConditionID: ... }",
    ],
  },
} satisfies EndpointMeta<MountainPassConditionByIdInput, PassCondition>;

/**
 * Factory result for mountain pass condition by ID
 */
const mountainPassConditionByIdFactory = createFetchAndHook<
  MountainPassConditionByIdInput,
  PassCondition
>({
  api: wsdotMountainPassConditionsApiMeta,
  endpoint: mountainPassConditionByIdMeta,
  getEndpointGroup: () =>
    require("./shared/passConditions.endpoints").passConditionsGroup,
});

/**
 * Fetch function and React Query hook for retrieving current conditions for a specific mountain pass by ID
 */
export const {
  fetch: fetchMountainPassConditionById,
  hook: useMountainPassConditionById,
} = mountainPassConditionByIdFactory;
