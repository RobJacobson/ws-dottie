import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./validDateRange.input";
import * as o from "./validDateRange.output";

export const validDateRangeResource: EndpointGroup = {
  name: "valid-date-range",
  documentation: {
    resourceDescription:
      "Returns a date range for which fares data is currently published and available. This operation helps applications determine valid trip dates for fare queries.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
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
