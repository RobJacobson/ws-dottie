import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import {
  type TripRatesByVersionInput,
  tripRatesByVersionInputSchema,
} from "./shared/tollTripRates.input";
import {
  type TollTripsRates,
  tollTripsRatesSchema,
} from "./shared/tollTripRates.output";

/**
 * Metadata for the fetchTripRatesByVersion endpoint
 */
export const tripRatesByVersionMeta = {
  functionName: "fetchTripRatesByVersion",
  endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
  inputSchema: tripRatesByVersionInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: { Version: 352417 },
  endpointDescription: "Get toll rates for a specific version number.",
  toolDescription: {
    purpose: "Get toll rates for a specific version number.",
    useWhen: [
      "accessing toll rates from a known historical version",
      "version-specific rate comparison",
      "reproducing past toll calculations",
    ],
    avoidWhen: [
      "you need current rates (prefer fetchTollTripRates)",
      "you need rates for a date range (prefer fetchTripRatesByDate)",
    ],
    inputs: [
      "Version: numeric version number from fetchTollTripRates Version field",
    ],
    returns: "object — toll rates container for the specified version",
    outputHighlights: [
      "Container: LastUpdated (when this version was created), Version (matches input)",
      "Trips array: complete set of trip rates for this version",
      "Rate details: TripName, Toll amount, Message text, MessageUpdateTime",
      "Version consistency: all rates in this response are from the same version",
      "Historical access: allows retrieving past rate configurations",
    ],
    chaining: [
      "fetchTollTripRates → extract Version → call fetchTripRatesByVersion with { Version: ... }",
    ],
  },
} satisfies EndpointMeta<TripRatesByVersionInput, TollTripsRates>;

/**
 * Factory result for trip rates by version
 */
const tripRatesByVersionFactory = createFetchAndHook<
  TripRatesByVersionInput,
  TollTripsRates
>({
  api: wsdotTollRatesApiMeta,
  endpoint: tripRatesByVersionMeta,
  getEndpointGroup: () =>
    require("./shared/tollTripRates.endpoints").tollTripRatesGroup,
});

/**
 * Fetch function and React Query hook for retrieving toll rates for a specific version number
 */
export const { fetch: fetchTripRatesByVersion, hook: useTripRatesByVersion } =
  tripRatesByVersionFactory;
