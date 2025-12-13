import {
  type ValidDateRange,
  validDateRangeSchema,
} from "@/apis/shared/validDateRange.output";
import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfFaresApiMeta } from "../apiMeta";
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
  toolDescription: {
    purpose: "Get date range when fares data is published and available.",
    useWhen: [
      "validating trip dates before fare queries",
      "determining available booking periods",
      "checking fare data coverage for specific dates",
    ],
    inputs: [],
    returns: "object — fare data validity period",
    outputHighlights: [
      "DateFrom: earliest UTC datetime when fares are available",
      "DateThru: latest UTC datetime when fares are available",
      "both dates in ISO 8601 format",
      "use to validate TripDate parameters in other endpoints",
    ],
    chaining: [
      "fetchFaresValidDateRange → validate TripDate → call fare endpoints with valid dates",
    ],
  },
} satisfies EndpointMeta<FaresValidDateRangeInput, ValidDateRange>;

/**
 * Factory result for fares valid date range
 */
const faresValidDateRangeFactory = createFetchAndHook<
  FaresValidDateRangeInput,
  ValidDateRange
>({
  api: wsfFaresApiMeta,
  endpoint: faresValidDateRangeMeta,
  getEndpointGroup: () =>
    require("./shared/validDateRange.endpoints").validDateRangeGroup,
});

/**
 * Fetch function and React Query hook for retrieving the validity date range for published fares data
 */
export const { fetch: fetchFaresValidDateRange, hook: useFaresValidDateRange } =
  faresValidDateRangeFactory;
