import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import {
  type TollTripRatesInput,
  tollTripRatesInputSchema,
} from "./shared/tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./shared/tollTripRates.output";

/**
 * Metadata for the fetchTollTripRates endpoint
 */
export const tollTripRatesMeta = {
  functionName: "fetchTollTripRates",
  endpoint: "/getTollTripRatesAsJson",
  inputSchema: tollTripRatesInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: {},
  endpointDescription: "Get current toll rates for all trips.",
  toolDescription: {
    purpose: "Get current toll rates for all trips.",
    useWhen: [
      "comprehensive toll pricing across all routes",
      "version tracking for toll data changes",
      "bulk toll rate analysis",
    ],
    avoidWhen: [
      "you only need HOV lane tolls (prefer fetchTollRates)",
      "you need historical rates (prefer fetchTripRatesByDate)",
    ],
    inputs: [],
    returns:
      "object — container with version, update time, and array of all trip rates",
    outputHighlights: [
      "Container: LastUpdated (UTC timestamp), Version (data version number)",
      "Trips array: each item has TripName, Toll (dollars), Message, MessageUpdateTime",
      "Rate details: Message (display text like '$4.95' or 'FREE'), MessageUpdateTime",
      "Trip identification: TripName (unique route identifier)",
      "Null handling: Trips array may be null when rates unavailable",
    ],
    chaining: [
      "fetchTollTripRates → extract Version → call fetchTripRatesByVersion with { Version: ... }",
    ],
  },
} satisfies EndpointMeta<TollTripRatesInput, TollTripsRates>;

/**
 * Factory result for toll trip rates
 */
const tollTripRatesFactory = createFetchAndHook<
  TollTripRatesInput,
  TollTripsRates
>({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripRatesMeta,
  getEndpointGroup: () =>
    require("./shared/tollTripRates.endpoints").tollTripRatesGroup,
});

/**
 * Fetch function and React Query hook for retrieving current toll rates for all trips
 */
export const { fetch: fetchTollTripRates, hook: useTollTripRates } =
  tollTripRatesFactory;
