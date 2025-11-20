import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { z } from "@/shared/zod";
import { wsdotHighwayAlertsApiMeta } from "../apiMeta";
import { eventCategoriesGroup } from "./shared/eventCategories.endpoints";
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
 * Fetch function for retrieving all available event category names for filtering alerts
 */
export const fetchEventCategories: FetchFactory<
  EventCategoriesInput,
  string[]
> = createFetchFunction({
  api: wsdotHighwayAlertsApiMeta,
  endpoint: eventCategoriesMeta,
});

/**
 * React Query hook for retrieving all available event category names for filtering alerts
 */
export const useEventCategories: HookFactory<EventCategoriesInput, string[]> =
  createHook({
    apiName: wsdotHighwayAlertsApiMeta.name,
    endpointName: eventCategoriesMeta.functionName,
    fetchFn: fetchEventCategories,
    cacheStrategy: eventCategoriesGroup.cacheStrategy,
  });
