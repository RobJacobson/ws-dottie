import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import * as fetchFunctions from "./eventCategories.fetch";
import type { EventCategoriesInput } from "./eventCategories.input";

const hooks = createHooks(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup,
  fetchFunctions
);

export const useEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>,
  options?: QueryHookOptions<string[]>
) => UseQueryResult<string[], Error> = hooks.useEventCategories;
