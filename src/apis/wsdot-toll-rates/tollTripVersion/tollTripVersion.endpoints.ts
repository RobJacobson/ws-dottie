import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./tollTripVersion.input";
import * as o from "./tollTripVersion.output";

export const tollTripVersionResource = {
  name: "toll-trip-version",
  documentation: {
    resourceDescription:
      "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripVersion: {
      function: "getTollTripVersion",
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: i.tollTripVersionInputSchema,
      outputSchema: o.tollTripVersionSchema,
      sampleParams: {},
      endpointDescription:
        "Returns current version and timestamp information for toll trip data.",
    } satisfies EndpointDefinition<i.TollTripVersionInput, o.TollTripVersion>,
  },
} satisfies EndpointGroup;
