import { apis } from "@/apis/shared/apis";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  type FaresValidDateRangeInput,
  faresValidDateRangeInputSchema,
} from "./validDateRange.input";

export const validDateRangeGroup: EndpointGroup = {
  name: "valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Validity period for published WSF fare data.",
    description:
      "Returns the start and end dates between which fare information is accurate and available for all ferry routes. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Determine valid trip dates for fare queries.",
      "Validate trip date inputs before calling other endpoints.",
      "Display available date ranges in booking interfaces.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchFaresValidDateRange = createEndpoint<
  FaresValidDateRangeInput,
  any
>({
  api: apis.wsfFares,
  group: validDateRangeGroup,
  functionName: "fetchFaresValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: faresValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription: "Get the validity date range for published fares data.",
});
