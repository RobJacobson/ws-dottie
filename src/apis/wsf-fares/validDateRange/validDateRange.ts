import type { EndpointDefinition } from "@/apis/types";
import * as i from "./validDateRange.input";
import * as o from "./validDateRange.output";

export const validDateRangeResource = {
  name: "valid-date-range",
  resourceDescription:
    "Returns a date range for which fares data is currently published and available. This operation helps applications determine valid trip dates for fare queries. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFaresValidDateRange: {
      function: "getFaresValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeResponseSchema,
      sampleParams: {},
      endpointDescription:
        "Returns a date range for which fares data is currently published and available. This operation helps applications determine valid trip dates for fare queries.",
    } satisfies EndpointDefinition<
      i.ValidDateRangeInput,
      o.ValidDateRangeResponse
    >,
  },
};
