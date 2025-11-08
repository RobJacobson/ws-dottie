import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type TollTripInfoInput,
  tollTripInfoInputSchema,
} from "./tollTripInfo.input";
import { type TollTripInfo, tollTripInfoSchema } from "./tollTripInfo.output";

export const tollTripInfoResource = {
  name: "toll-trip-info",
  documentation: {
    resourceDescription:
      "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchTollTripInfo: {
      endpoint: "/getTollTripInfoAsJson",
      inputSchema: tollTripInfoInputSchema,
      outputSchema: z.array(tollTripInfoSchema),
      sampleParams: {},
      endpointDescription: "Returns trip information for all toll trips.",
    } satisfies EndpointDefinition<TollTripInfoInput, TollTripInfo[]>,
  },
} satisfies EndpointGroup;
