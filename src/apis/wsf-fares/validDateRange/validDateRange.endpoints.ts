import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./validDateRange.input";
import * as o from "./validDateRange.output";

export const validDateRangeGroup: EndpointGroup = {
  name: "valid-date-range",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item represents the current validity period for Washington State Ferries fare data. This endpoint provides the start and end dates between which fare information is accurate and published for all ferry routes.",
    businessContext:
      "Use to determine valid fare calculation periods by providing DateFrom and DateThru dates for accurate fare queries and booking systems.",
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
        "Returns a single ValidDateRange object for the current fares data validity period.",
    } satisfies EndpointDefinition<
      i.ValidDateRangeInput,
      o.ValidDateRangeResponse
    >,
  },
};
