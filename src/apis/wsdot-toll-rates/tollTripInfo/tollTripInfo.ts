import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./tollTripInfo.input";
import * as o from "./tollTripInfo.output";

export const tollTripInfoResource: EndpointGroup = {
  name: "toll-trip-info",
  documentation: {
    resourceDescription:
      "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripInfo: {
      function: "getTollTripInfo",
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: i.getTollTripInfoSchema,
      outputSchema: z.array(o.tollTripInfoSchema),
      sampleParams: {},
      endpointDescription: "Returns trip information for all toll trips.",
    } satisfies EndpointDefinition<i.GetTollTripInfoInput, o.TollTripInfo[]>,
  },
};
