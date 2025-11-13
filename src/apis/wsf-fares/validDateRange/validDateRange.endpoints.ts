import { validDateRangeSchema } from "@/apis/shared/validDateRange.output";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfFaresApi } from "../apiDefinition";
import { faresValidDateRangeInputSchema } from "./validDateRange.input";

const group = defineEndpointGroup({
  api: wsfFaresApi,
  name: "valid-date-range",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each ValidDateRange item represents the current validity period for Washington State Ferries fare data. This endpoint provides the start and end dates between which fare information is accurate and published for all ferry routes.",
    businessContext:
      "Use to determine valid fare calculation periods by providing DateFrom and DateThru dates for accurate fare queries and booking systems.",
  },
});

export const fetchFaresValidDateRange = defineEndpoint({
  group,
  functionName: "fetchFaresValidDateRange",
  definition: {
    endpoint: "/validdaterange",
    inputSchema: faresValidDateRangeInputSchema,
    outputSchema: validDateRangeSchema,
    sampleParams: {},
    endpointDescription:
      "Returns a single ValidDateRange object for the current fares data validity period.",
  },
});

export const validDateRangeGroup = group.descriptor;
