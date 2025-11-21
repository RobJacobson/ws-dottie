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
