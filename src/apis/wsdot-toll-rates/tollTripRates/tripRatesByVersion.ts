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
