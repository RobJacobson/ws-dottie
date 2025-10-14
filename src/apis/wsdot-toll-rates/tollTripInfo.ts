import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.";

export const tollTripInfoResource = {
  name: "toll-trip-info",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getTollTripInfo",
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: i.getTollTripInfoSchema,
      outputSchema: z.array(o.tollTripInfoSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns trip information for all toll trips. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTollTripInfoInput, o.TollTripInfo[]>,
  },
};
