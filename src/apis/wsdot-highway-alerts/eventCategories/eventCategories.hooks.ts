import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
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
