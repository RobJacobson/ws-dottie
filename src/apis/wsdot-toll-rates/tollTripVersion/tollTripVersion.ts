import type { EndpointDefinition } from "@/apis/types";
import * as i from "./tollTripVersion.input";
import * as o from "./tollTripVersion.output";

export const export const tollTripVersionResource = {: EndpointGroup 
  name: "toll-trip-version",
  resourceDescription:
    "TollTripVersion provides version and timestamp information for toll trip data,
  documentation: {
    resourceDescription: "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripVersion: {
      function: "getTollTripVersion",
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: i.getTollTripVersionSchema,
      outputSchema: o.tollTripVersionSchema,
      sampleParams: {},
      endpointDescription:
        "Returns current version and timestamp information for toll trip data.",
    } satisfies EndpointDefinition<
      i.GetTollTripVersionInput,
      o.TollTripVersion
    >,
  },
};
