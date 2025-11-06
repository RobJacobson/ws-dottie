import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type { TollTripInfoInput } from "./tollTripInfo.input";
import { tollTripInfoInputSchema } from "./tollTripInfo.input";
import type { TollTripInfo } from "./tollTripInfo.output";
import { tollTripInfoSchema } from "./tollTripInfo.output";

export const tollTripInfoResource = {
  name: "toll-trip-info",
  documentation: {
    resourceDescription:
      "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getTollTripInfo: {
      function: "getTollTripInfo",
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: tollTripInfoInputSchema,
      outputSchema: z.array(tollTripInfoSchema),
      sampleParams: {},
      endpointDescription: "Returns trip information for all toll trips.",
    } satisfies EndpointDefinition<TollTripInfoInput, TollTripInfo[]>,
  },
} satisfies EndpointGroup;
