import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import { type TollRatesInput, tollRatesInputSchema } from "./tollRates.input";
import { type TollRate, tollRateSchema } from "./tollRates.output";

export const tollRatesResource = {
  name: "toll-rates",
  documentation: {
    resourceDescription:
      "Each TollRate item represents current toll pricing information for high occupancy toll lanes across Washington state. Each rate contains dynamic pricing data, trip location details, and real-time update timestamps for congestion management.",
    businessContext:
      "Use to calculate travel costs and make informed routing decisions by providing current toll amounts and trip details for high occupancy lane usage across Washington state highways.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchTollRates: {
      endpoint: "/getTollRatesAsJson",
      inputSchema: tollRatesInputSchema,
      outputSchema: z.array(tollRateSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple TollRate items for all high occupancy toll lanes statewide.",
    } satisfies EndpointDefinition<TollRatesInput, TollRate[]>,
  },
} satisfies EndpointGroup;
