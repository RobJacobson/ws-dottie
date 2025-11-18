import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotBorderCrossingsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { borderCrossingDataGroup } from "./shared/borderCrossingData.endpoints";
import {
  type BorderCrossingsInput,
  borderCrossingsInputSchema,
} from "./shared/borderCrossingData.input";
import {
  type BorderCrossing,
  borderCrossingSchema,
} from "./shared/borderCrossingData.output";

/**
 * Metadata for the fetchBorderCrossings endpoint
 */
export const borderCrossingsMeta = {
  functionName: "fetchBorderCrossings",
  endpoint: "/GetBorderCrossingsAsJson",
  inputSchema: borderCrossingsInputSchema,
  outputSchema: borderCrossingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current wait times for all Washington border crossings into Canada.",
} satisfies EndpointMeta<BorderCrossingsInput, BorderCrossing[]>;

/**
 * Fetch function for retrieving current wait times for all Washington border crossings into Canada
 */
export const fetchBorderCrossings: (
  params?: FetchFunctionParams<BorderCrossingsInput>
) => Promise<BorderCrossing[]> = createFetchFunction(
  wsdotBorderCrossingsApi,
  borderCrossingDataGroup,
  borderCrossingsMeta
);

/**
 * React Query hook for retrieving current wait times for all Washington border crossings into Canada
 */
export const useBorderCrossings: (
  params?: FetchFunctionParams<BorderCrossingsInput>,
  options?: QueryHookOptions<BorderCrossing[]>
) => UseQueryResult<BorderCrossing[], Error> = createHook(
  wsdotBorderCrossingsApi,
  borderCrossingDataGroup,
  borderCrossingsMeta
);
