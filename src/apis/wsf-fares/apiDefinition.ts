import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateGroup } from "./cacheFlushDate/cacheFlushDate";
import { fareLineItemsGroup } from "./fareLineItems/fareLineItems";
import { fareTotalsGroup } from "./fareTotals/fareTotals";
import { terminalComboGroup } from "./terminalCombo/terminalCombo";
import { terminalsGroup } from "./terminals/terminals";
import { validDateRangeGroup } from "./validDateRange/validDateRange";

export const wsfFaresApi: ApiDefinition = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpointGroups: [
    cacheFlushDateGroup,
    validDateRangeGroup,
    terminalsGroup,
    terminalComboGroup,
    fareLineItemsGroup,
    fareTotalsGroup,
  ],
};

// Export individual resources for direct use
export {
  cacheFlushDateGroup,
  validDateRangeGroup,
  terminalsGroup,
  terminalComboGroup,
  fareLineItemsGroup,
  fareTotalsGroup,
};
