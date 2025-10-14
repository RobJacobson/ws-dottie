import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.";

export const tollTripVersionResource = {
  name: "toll-trip-version",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    current: {
      function: "getTollTripVersion",
      endpoint: "/getTollTripVersionAsJson",
      inputSchema: i.getTollTripVersionSchema,
      outputSchema: o.tollTripVersionSchema,
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current version and timestamp information for toll trip data. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetTollTripVersionInput,
      o.TollTripVersion
    >,
  },
};
