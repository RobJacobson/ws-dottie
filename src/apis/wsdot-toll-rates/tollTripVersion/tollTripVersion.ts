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
import { tollTripVersionGroup } from "./shared/tollTripVersion.endpoints";
import {
  type TollTripVersionInput,
  tollTripVersionInputSchema,
} from "./shared/tollTripVersion.input";
import {
  type TollTripVersion,
  tollTripVersionSchema,
} from "./shared/tollTripVersion.output";

/**
 * Metadata for the fetchTollTripVersion endpoint
 */
export const tollTripVersionMeta = {
  functionName: "fetchTollTripVersion",
  endpoint: "/getTollTripVersionAsJson",
  inputSchema: tollTripVersionInputSchema,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  endpointDescription: "Get current version and timestamp for toll trip data.",
} satisfies EndpointMeta<TollTripVersionInput, TollTripVersion>;

/**
 * Fetch function for retrieving current version and timestamp for toll trip data
 */
export const fetchTollTripVersion: (
  params?: FetchFunctionParams<TollTripVersionInput>
) => Promise<TollTripVersion> = createFetchFunction(
  wsdotTollRatesApi.api,
  tollTripVersionGroup,
  tollTripVersionMeta
);

/**
 * React Query hook for retrieving current version and timestamp for toll trip data
 */
export const useTollTripVersion: (
  params?: FetchFunctionParams<TollTripVersionInput>,
  options?: QueryHookOptions<TollTripVersion>
) => UseQueryResult<TollTripVersion, Error> = createHook(
  wsdotTollRatesApi.api,
  tollTripVersionGroup,
  tollTripVersionMeta
);

