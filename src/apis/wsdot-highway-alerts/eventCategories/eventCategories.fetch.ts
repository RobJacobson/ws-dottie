import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import type { EventCategoriesInput } from "./eventCategories.input";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup
);

export const fetchEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>
) => Promise<string[]> = fetchFunctions.fetchEventCategories;
