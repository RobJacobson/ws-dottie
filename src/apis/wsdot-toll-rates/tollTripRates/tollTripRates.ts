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
