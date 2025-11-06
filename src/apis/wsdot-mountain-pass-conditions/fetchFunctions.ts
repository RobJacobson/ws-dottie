import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotMountainPassConditionsApi } from "./apiDefinition";

export const { fetchMountainPassConditionById, fetchMountainPassConditions } =
  createFetchFunctions(wsdotMountainPassConditionsApi);
