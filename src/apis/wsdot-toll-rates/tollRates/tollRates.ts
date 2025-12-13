import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import {
  type TollRatesInput,
  tollRatesInputSchema,
} from "./shared/tollRates.input";
import { type TollRate, tollRateSchema } from "./shared/tollRates.output";

/**
 * Metadata for the fetchTollRates endpoint
 */
export const tollRatesMeta = {
  functionName: "fetchTollRates",
  endpoint: "/getTollRatesAsJson",
  inputSchema: tollRatesInputSchema,
  outputSchema: tollRateSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current toll rates for all HOV toll lanes statewide.",
  toolDescription: {
    purpose: "List current toll rates for all HOV toll lanes statewide.",
    useWhen: [
      "route planning with toll costs",
      "comparing toll rates across different lanes",
      "toll pricing analysis",
    ],
    avoidWhen: [
      "you only need toll rates for specific trips (prefer fetchTollTripRates)",
    ],
    inputs: [],
    returns: "array — one item per toll lane segment",
    outputHighlights: [
      "Locations: StartLocationName/EndLocationName with coordinates and mileposts",
      "Toll pricing: CurrentToll (cents), CurrentMessage (sign display text)",
      "Route info: StateRoute (e.g., '099', '405'), TravelDirection, TripName",
      "Timing: TimeUpdated (UTC timestamp for last rate change)",
      "Coordinates: Start/End Latitude/Longitude for mapping",
    ],
  },
} satisfies EndpointMeta<TollRatesInput, TollRate[]>;

/**
 * Factory result for toll rates
 */
const tollRatesFactory = createFetchAndHook<TollRatesInput, TollRate[]>({
  api: wsdotTollRatesApiMeta,
  endpoint: tollRatesMeta,
  getEndpointGroup: () =>
    require("./shared/tollRates.endpoints").tollRatesGroup,
});

/**
 * Fetch function and React Query hook for retrieving current toll rates for all HOV toll lanes statewide
 */
export const { fetch: fetchTollRates, hook: useTollRates } = tollRatesFactory;
