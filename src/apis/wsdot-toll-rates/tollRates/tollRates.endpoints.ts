import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { tollRatesInputSchema } from "./tollRates.input";
import { tollRateSchema } from "./tollRates.output";

export const tollRatesGroup: EndpointGroup = {
  name: "toll-rates",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current toll rates for high occupancy vehicle (HOV) toll lanes statewide.",
    description:
      "Real-time toll pricing data including trip locations, current toll amounts, route associations, and update timestamps for congestion management.",
    useCases: [
      "Calculate travel costs for HOV toll lane usage.",
      "Display current toll amounts in navigation apps.",
      "Make informed routing decisions based on toll pricing.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchTollRates = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollRatesGroup,
  functionName: "fetchTollRates",
  endpoint: "/getTollRatesAsJson",
  inputSchema: tollRatesInputSchema,
  outputSchema: tollRateSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current toll rates for all HOV toll lanes statewide.",
});
