import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./eventCategories.input";

export const eventCategoriesGroup: EndpointGroup = {
  name: "event-categories",
  documentation: {
    resourceDescription:
      "Event categories classify different types of highway alerts such as collisions, maintenance work, construction, weather-related events, and other traffic incidents.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
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
        "Returns a list of all available event category names used to classify highway alerts.",
    } satisfies EndpointDefinition<i.GetEventCategoriesInput, string[]>,
  },
};
