import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import * as fetchFunctions from "./eventCategories.fetch";
import type { EventCategoriesInput } from "./eventCategories.input";

const hooks = createEndpointGroupHooks(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup,
  fetchFunctions
);

export const useEventCategories = hooks.useEventCategories as (
  params?: EventCategoriesInput,
  options?: QueryHookOptions<string[]>
) => UseQueryResult<string[], Error>;
