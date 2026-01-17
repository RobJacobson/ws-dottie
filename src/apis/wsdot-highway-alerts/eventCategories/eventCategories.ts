import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { z } from "@/shared/zod";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import {
  type EventCategoriesInput,
  eventCategoriesInputSchema,
} from "./shared/eventCategories.input";

/**
 * Metadata for the fetchEventCategories endpoint
 */
export const eventCategoriesMeta = {
  functionName: "fetchEventCategories",
  endpoint: "/getEventCategoriesAsJson",
  inputSchema: eventCategoriesInputSchema,
  outputSchema: z.string().array(),
  sampleParams: {},
  endpointDescription:
    "List all available event category names for filtering alerts.",
  toolDescription: {
    purpose:
      "List all available event category names for filtering highway alerts by incident type.",
    useWhen: [
      "discovering valid event category names for alert searches",
      "building category filter interfaces",
      "understanding available alert classification types",
    ],
    inputs: [],
    returns: "array — one item per event category name",
    outputHighlights: [
      "Categories: string names like 'Construction', 'Collision', 'Weather'",
      "Coverage: includes incidents, maintenance, weather, and emergency types",
      "Count: ~120 categories total",
      "Usage: use exact category names for filtering in searchAlerts",
      "Special: includes empty string as first item",
    ],
    chaining: [
      "fetchEventCategories → extract category name → call searchAlerts with { EventCategory: ... }",
    ],
  },
} satisfies EndpointMeta<EventCategoriesInput, string[]>;

/**
 * Factory result for event categories
 */
const eventCategoriesFactory = createFetchAndHook<
  EventCategoriesInput,
  string[]
>({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: eventCategoriesMeta,
  getEndpointGroup: () =>
    require("./shared/eventCategories.endpoints").eventCategoriesGroup,
});

/**
 * Fetch function and React Query hook for retrieving all available event category names for filtering alerts
 */
export const { fetch: fetchEventCategories, hook: useEventCategories } =
  eventCategoriesFactory;
