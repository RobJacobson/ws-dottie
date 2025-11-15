import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { z } from "@/shared/zod";
import { eventCategoriesInputSchema } from "./eventCategories.input";

export const eventCategoriesGroup: EndpointGroup = {
  name: "event-categories",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each EventCategory item represents a classification type for highway alerts including collisions, maintenance work, construction, weather-related events, and other traffic incidents. These categories help organize and filter alerts by incident type.",
    businessContext:
      "Use to categorize and filter highway alerts by incident type by providing standardized event classifications for targeted traffic information retrieval.",
  },
};

export const fetchEventCategories = defineEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: eventCategoriesGroup,
  functionName: "fetchEventCategories",
  endpoint: "/getEventCategoriesAsJson",
  inputSchema: eventCategoriesInputSchema,
  outputSchema: z.string().array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of strings for all available event categories.",
});
