import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./schemas/tollTripInfo.input";
import * as o from "./schemas/tollTripInfo.output";

export const tollTripInfoResource = {
  name: "toll-trip-info",
  resourceDescription:
    "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
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
