import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./eventCategories.input";

export const eventCategoriesGroup: EndpointGroup = {
  name: "event-categories",
  documentation: {
    resourceDescription:
      "Each EventCategory item represents a classification type for highway alerts including collisions, maintenance work, construction, weather-related events, and other traffic incidents. These categories help organize and filter alerts by incident type.",
    businessContext:
      "Use to categorize and filter highway alerts by incident type by providing standardized event classifications for targeted traffic information retrieval.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getEventCategories: {
      function: "getEventCategories",
      endpoint: "/getEventCategoriesAsJson",
      inputSchema: i.getEventCategoriesSchema,
      outputSchema: z.array(z.string()),
      sampleParams: {},
      endpointDescription:
        "Returns an array of strings for all available event categories.",
    } satisfies EndpointDefinition<i.GetEventCategoriesInput, string[]>,
  },
};
