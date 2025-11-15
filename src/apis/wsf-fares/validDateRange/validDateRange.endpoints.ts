import { apis } from "@/apis/shared/apis";
import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import type { EndpointGroup } from "@/apis/types";
import {
  type FaresValidDateRangeInput,
  faresValidDateRangeInputSchema,
} from "./validDateRange.input";

export const validDateRangeGroup: EndpointGroup = {
  name: "valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item represents current validity period for Washington State Ferries fare data. This endpoint provides the start and end dates between which fare information is accurate and published for all ferry routes.",
    businessContext:
      "Use to determine valid fare calculation periods by providing DateFrom and DateThru dates for accurate fare queries and booking systems.",
  },
};

export const fetchFaresValidDateRange = defineEndpoint<
  FaresValidDateRangeInput,
  any
>({
  api: apis.wsdotBorderCrossings,
  group: validDateRangeGroup,
  functionName: "fetchFaresValidDateRange",
  endpoint: "/validdaterange",
  inputSchema: faresValidDateRangeInputSchema,
  outputSchema: validDateRangeSchema,
  sampleParams: {},
  endpointDescription:
    "Returns a single ValidDateRange object for the current fares data validity period.",
});
