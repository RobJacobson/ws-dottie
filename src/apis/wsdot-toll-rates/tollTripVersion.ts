import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./schemas/tollTripVersion.input";
import * as o from "./schemas/tollTripVersion.output";

export const tollTripVersionResource = {
  name: "toll-trip-version",
  resourceDescription:
    "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
  cacheStrategy: "FREQUENT" as const,
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
