import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotHighwayAlertsApi } from "../api";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories";
import { z } from "@/shared/zod";
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
export const fetchEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>
) => Promise<string[]> = createFetchFunction(
  wsdotHighwayAlertsApi.api,
  eventCategoriesGroup,
  eventCategoriesMeta
);

/**
 * React Query hook for retrieving all available event category names for filtering alerts
 */
export const useEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>,
  options?: QueryHookOptions<string[]>
) => UseQueryResult<string[], Error> = createHook(
  wsdotHighwayAlertsApi.api,
  eventCategoriesGroup,
  eventCategoriesMeta
);
