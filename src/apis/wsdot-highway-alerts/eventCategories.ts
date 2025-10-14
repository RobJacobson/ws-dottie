import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";

const DESCRIPTION =
  "Event categories classify different types of highway alerts such as collisions, maintenance work, construction, weather-related events, and other traffic incidents.";

export const eventCategoriesResource = {
  name: "event-categories",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getEventCategories",
      endpoint: "/getEventCategoriesAsJson",
      inputSchema: i.getEventCategoriesSchema,
      outputSchema: z.array(z.string()),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns a list of all available event category names used to classify highway alerts. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetEventCategoriesInput, string[]>,
  },
};
