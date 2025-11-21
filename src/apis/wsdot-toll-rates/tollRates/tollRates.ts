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
