import type { EndpointGroupMeta } from "@/apis/types";
import { eventCategoriesMeta } from "../eventCategories";

/**
 * Endpoint group metadata for event categories endpoints
 */
export const eventCategoriesGroup: EndpointGroupMeta = {
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
  endpoints: [eventCategoriesMeta],
};
