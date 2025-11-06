import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import type { EventCategoriesInput } from "./eventCategories.input";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup
);

export const fetchEventCategories = fetchFunctions.fetchEventCategories as (
  params?: FetchFunctionParams<EventCategoriesInput>
) => Promise<string[]>;
