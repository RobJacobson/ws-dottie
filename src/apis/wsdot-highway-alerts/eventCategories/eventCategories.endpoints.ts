import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { z } from "@/shared/zod";
import { eventCategoriesInputSchema } from "./eventCategories.input";

export const eventCategoriesGroup: EndpointGroup = {
  name: "event-categories",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Event category classifications for highway alerts.",
    description:
      "Standardized category names used to classify and filter highway alerts by incident type, such as construction, collisions, maintenance, and weather events.",
    useCases: [
      "Filter highway alerts by event category type.",
      "Obtain valid category names for alert searches.",
      "Categorize alerts in user interfaces by incident type.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchEventCategories = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: eventCategoriesGroup,
  functionName: "fetchEventCategories",
  endpoint: "/getEventCategoriesAsJson",
  inputSchema: eventCategoriesInputSchema,
  outputSchema: z.string().array(),
  sampleParams: {},
  endpointDescription:
    "List all available event category names for filtering alerts.",
});
