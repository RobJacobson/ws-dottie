import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollRatesInputSchema } from "./tollRates.input";
import { tollRateSchema } from "./tollRates.output";

const group = defineEndpointGroup({
  api: wsdotTollRatesApi,
  name: "toll-rates",
  documentation: {
    resourceDescription:
      "Each TollRate item represents current toll pricing information for high occupancy toll lanes across Washington state. Each rate contains dynamic pricing data, trip location details, and real-time update timestamps for congestion management.",
    businessContext:
      "Use to calculate travel costs and make informed routing decisions by providing current toll amounts and trip details for high occupancy lane usage across Washington state highways.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchTollRates = defineEndpoint({
  group,
  functionName: "fetchTollRates",
  definition: {
    endpoint: "/getTollRatesAsJson",
    inputSchema: tollRatesInputSchema,
    outputSchema: tollRateSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns multiple TollRate items for all high occupancy toll lanes statewide.",
  },
});

export const tollRatesResource = group.descriptor;
