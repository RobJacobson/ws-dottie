import { wsdotHighwayAlertsApi } from "@/apis/wsdot-highway-alerts/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import type { EventCategoriesInput } from "./eventCategories.input";

const fetchFunctions = createFetchFunctions(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup
);

export const fetchEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>
) => Promise<string[]> = fetchFunctions.fetchEventCategories;
