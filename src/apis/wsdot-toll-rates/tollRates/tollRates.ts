import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./tollRates.input";
import * as o from "./tollRates.output";

export const export const tollRatesResource = {: EndpointGroup 
  name: "toll-rates",
  resourceDescription:
    "TollRate information provides current toll rates for high occupancy lanes across statewide coverage areas. Each rate includes trip details,
  documentation: {
    resourceDescription: "TollRate information provides current toll rates for high occupancy lanes across statewide coverage areas. Each rate includes trip details, current toll amounts in cents, location information, and last update timestamps.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollRates: {
      function: "getTollRates",
      endpoint: "/getTollRatesAsJson",
      inputSchema: i.getTollRatesSchema,
      outputSchema: z.array(o.tollRateSchema),
      sampleParams: {},
      endpointDescription:
        "Returns current toll rate information for all toll trips.",
    } satisfies EndpointDefinition<i.GetTollRatesInput, o.TollRate[]>,
  },
};
