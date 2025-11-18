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
import { tollTripInfoGroup } from "./shared/tollTripInfo.endpoints";
import {
  type TollTripInfoInput,
  tollTripInfoInputSchema,
} from "./shared/tollTripInfo.input";
import {
  type TollTripInfo,
  tollTripInfoSchema,
} from "./shared/tollTripInfo.output";

/**
 * Metadata for the fetchTollTripInfo endpoint
 */
export const tollTripInfoMeta = {
  functionName: "fetchTollTripInfo",
  endpoint: "/getTollTripInfoAsJson",
  inputSchema: tollTripInfoInputSchema,
  outputSchema: tollTripInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "List trip information for all toll trips statewide.",
} satisfies EndpointMeta<TollTripInfoInput, TollTripInfo[]>;

/**
 * Fetch function for retrieving trip information for all toll trips statewide
 */
export const fetchTollTripInfo: (
  params?: FetchFunctionParams<TollTripInfoInput>
) => Promise<TollTripInfo[]> = createFetchFunction(
  wsdotTollRatesApi,
  tollTripInfoGroup,
  tollTripInfoMeta
);

/**
 * React Query hook for retrieving trip information for all toll trips statewide
 */
export const useTollTripInfo: (
  params?: FetchFunctionParams<TollTripInfoInput>,
  options?: QueryHookOptions<TollTripInfo[]>
) => UseQueryResult<TollTripInfo[], Error> = createHook(
  wsdotTollRatesApi,
  tollTripInfoGroup,
  tollTripInfoMeta
);
