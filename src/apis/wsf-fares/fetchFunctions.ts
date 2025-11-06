import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsfFaresApi } from "./apiDefinition";

export const {
  fetchCacheFlushDate,
  fetchFaresValidDateRange,
  fetchFaresTerminals,
  fetchTerminalMates,
  fetchTerminalCombo,
  fetchTerminalComboVerbose,
  fetchFareTotalsByTripDateAndRoute,
  fetchFareLineItemsByTripDateAndTerminals,
  fetchFareLineItemsBasic,
  fetchFareLineItemsVerbose,
} = createFetchFunctions(wsfFaresApi);
