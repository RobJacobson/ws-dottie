import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import { type MapAreasInput, mapAreasInputSchema } from "./alertAreas.input";
import { type Area, areaSchema } from "./alertAreas.output";

export const alertAreasGroup = {
  name: "alertAreas",
  documentation: {
    resourceDescription:
      "Each Area item represents a geographic region used for organizing and filtering highway alerts across Washington State. These include unique area codes and descriptive names for different regions.",
    businessContext:
      "Use to filter highway alerts by geographic region by providing area codes and descriptions for targeted traffic information retrieval.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchMapAreas: {
      endpoint: "/getMapAreasAsJson",
      inputSchema: mapAreasInputSchema,
      outputSchema: z.array(areaSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of Area objects for all available geographic regions.",
    } satisfies EndpointDefinition<MapAreasInput, Area[]>,
  },
} satisfies EndpointGroup;
