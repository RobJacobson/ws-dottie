import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/apis/shared/validDateRange.output";
import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsfFaresApiMeta } from "../apiMeta";
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
export const fetchFaresValidDateRange: FetchFactory<
  FaresValidDateRangeInput,
  ValidDateRange
> = createFetchFunction({
  api: wsfFaresApiMeta,
  endpoint: faresValidDateRangeMeta,
});

/**
 * React Query hook for retrieving the validity date range for published fares data
 */
export const useFaresValidDateRange: HookFactory<
  FaresValidDateRangeInput,
  ValidDateRange
> = createHook({
  apiName: wsfFaresApiMeta.name,
  endpointName: faresValidDateRangeMeta.functionName,
  fetchFn: fetchFaresValidDateRange,
  cacheStrategy: validDateRangeGroup.cacheStrategy,
});
