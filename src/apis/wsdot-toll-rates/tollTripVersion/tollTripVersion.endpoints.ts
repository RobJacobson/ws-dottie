import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import type { TollTripVersionInput } from "./tollTripVersion.input";
import { tollTripVersionInputSchema } from "./tollTripVersion.input";
import type { TollTripVersion } from "./tollTripVersion.output";
import { tollTripVersionSchema } from "./tollTripVersion.output";

export const tollTripVersionResource = {
  name: "toll-trip-version",
  documentation: {
    resourceDescription:
      "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchTollTripVersion: {
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: tollTripVersionInputSchema,
      outputSchema: tollTripVersionSchema,
      sampleParams: {},
      endpointDescription:
        "Returns current version and timestamp information for toll trip data.",
    } satisfies EndpointDefinition<TollTripVersionInput, TollTripVersion>,
  },
} satisfies EndpointGroup;
