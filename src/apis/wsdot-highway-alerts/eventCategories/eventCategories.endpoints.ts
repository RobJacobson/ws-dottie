import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { z } from "@/shared/zod";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { eventCategoriesInputSchema } from "./eventCategories.input";

const group = defineEndpointGroup({
  api: wsdotHighwayAlertsApi,
  name: "event-categories",
  documentation: {
    resourceDescription:
      "Each EventCategory item represents a classification type for highway alerts including collisions, maintenance work, construction, weather-related events, and other traffic incidents. These categories help organize and filter alerts by incident type.",
    businessContext:
      "Use to categorize and filter highway alerts by incident type by providing standardized event classifications for targeted traffic information retrieval.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchEventCategories = defineEndpoint({
  group,
  functionName: "fetchEventCategories",
  definition: {
    endpoint: "/getEventCategoriesAsJson",
    inputSchema: eventCategoriesInputSchema,
    outputSchema: z.string().array(),
    sampleParams: {},
    endpointDescription:
      "Returns an array of strings for all available event categories.",
  },
});

export const eventCategoriesGroup = group.descriptor;
