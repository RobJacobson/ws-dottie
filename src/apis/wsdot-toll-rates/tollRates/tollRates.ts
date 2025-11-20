import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import { tollRatesGroup } from "./shared/tollRates.endpoints";
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
 * Fetch function for retrieving current toll rates for all HOV toll lanes statewide
 */
export const fetchTollRates: FetchFactory<TollRatesInput, TollRate[]> =
  createFetchFunction({
    api: wsdotTollRatesApiMeta,
    endpoint: tollRatesMeta,
  });

/**
 * React Query hook for retrieving current toll rates for all HOV toll lanes statewide
 */
export const useTollRates: HookFactory<TollRatesInput, TollRate[]> = createHook(
  {
    apiName: wsdotTollRatesApiMeta.name,
    endpointName: tollRatesMeta.functionName,
    fetchFn: fetchTollRates,
    cacheStrategy: tollRatesGroup.cacheStrategy,
  }
);
