import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import { tollRatesInputSchema } from "./tollRates.input";
import { tollRateSchema } from "./tollRates.output";

export const tollRatesGroup = defineEndpointGroup({
  name: "toll-rates",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each TollRate item represents current toll pricing information for high occupancy toll lanes across Washington state. Each rate contains dynamic pricing data, trip location details, and real-time update timestamps for congestion management.",
    businessContext:
      "Use to calculate travel costs and make informed routing decisions by providing current toll amounts and trip details for high occupancy lane usage across Washington state highways.",
  },
});

export const fetchTollRates = defineEndpoint({
  api: API,
  group: tollRatesGroup,
  functionName: "fetchTollRates",
  endpoint: "/getTollRatesAsJson",
  inputSchema: tollRatesInputSchema,
  outputSchema: tollRateSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple TollRate items for all high occupancy toll lanes statewide.",
});
