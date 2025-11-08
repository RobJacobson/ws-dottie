import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateFaresGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { fareLineItemsGroup } from "./fareLineItems/fareLineItems.endpoints";
import { fareTotalsGroup } from "./fareTotals/fareTotals.endpoints";
import { terminalComboGroup } from "./terminalCombo/terminalCombo.endpoints";
import { terminalsGroup } from "./terminals/terminals.endpoints";
import { validDateRangeGroup } from "./validDateRange/validDateRange.endpoints";

export const wsfFaresApi = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpointGroups: [
    cacheFlushDateFaresGroup,
    validDateRangeGroup,
    terminalsGroup,
    terminalComboGroup,
    fareLineItemsGroup,
    fareTotalsGroup,
  ],
} satisfies ApiDefinition;
