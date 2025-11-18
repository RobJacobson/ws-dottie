import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/apis/shared/validDateRange.output";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { validDateRangeGroup } from "./shared/validDateRange.endpoints";
import {
  type FaresValidDateRangeInput,
  faresValidDateRangeInputSchema,
} from "./shared/validDateRange.input";

/**
 * Metadata for the fetchFaresValidDateRange endpoint
 */
export const faresValidDateRangeMeta = {
  functionName: "fetchFaresValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: faresValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription: "Get the validity date range for published fares data.",
} satisfies EndpointMeta<FaresValidDateRangeInput, ValidDateRange>;

/**
 * Fetch function for retrieving the validity date range for published fares data
 */
export const fetchFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>
) => Promise<ValidDateRange> = createFetchFunction(
  apis.wsfFares,
  validDateRangeGroup,
  faresValidDateRangeMeta
);

/**
 * React Query hook for retrieving the validity date range for published fares data
 */
export const useFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error> = createHook(
  apis.wsfFares,
  validDateRangeGroup,
  faresValidDateRangeMeta
);
