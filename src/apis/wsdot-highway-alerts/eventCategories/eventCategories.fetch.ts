import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { eventCategoriesGroup } from "./eventCategories.endpoints";
import type { EventCategoriesInput } from "./eventCategories.input";

const fetchFunctions = createFetchFunctions(
  wsdotHighwayAlertsApi,
  eventCategoriesGroup
);

export const fetchEventCategories: (
  params?: FetchFunctionParams<EventCategoriesInput>
) => Promise<string[]> = fetchFunctions.fetchEventCategories;
