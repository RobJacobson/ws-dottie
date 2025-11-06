import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotTollRatesApi } from "./apiDefinition";

export const {
  fetchTollRates,
  fetchTollTripInfo,
  fetchTollTripRates,
  fetchTripRatesByDate,
  fetchTripRatesByVersion,
  fetchTollTripVersion,
} = createFetchFunctions(wsdotTollRatesApi);
