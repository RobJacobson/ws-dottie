import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotTollRatesApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
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
export const fetchTollRates: (
  params?: FetchFunctionParams<TollRatesInput>
) => Promise<TollRate[]> = createFetchFunction(
  wsdotTollRatesApi.api,
  tollRatesGroup,
  tollRatesMeta
);

/**
 * React Query hook for retrieving current toll rates for all HOV toll lanes statewide
 */
export const useTollRates: (
  params?: FetchFunctionParams<TollRatesInput>,
  options?: QueryHookOptions<TollRate[]>
) => UseQueryResult<TollRate[], Error> = createHook(
  wsdotTollRatesApi.api,
  tollRatesGroup,
  tollRatesMeta
);
