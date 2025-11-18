import type { ApiDefinition } from "@/apis/types";
import { cacheFlushDateFaresGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { fareLineItemsGroup } from "./fareLineItems/shared/fareLineItems.endpoints";
import { fareTotalsGroup } from "./fareTotals/shared/fareTotals.endpoints";
import { terminalComboGroup } from "./terminalCombo/shared/terminalCombo.endpoints";
import { terminalsGroup } from "./terminals/shared/terminals.endpoints";
import { validDateRangeGroup } from "./validDateRange/shared/validDateRange.endpoints";

export const wsfFaresApi: ApiDefinition = {
  api: {
    name: "wsf-fares",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  },
  endpointGroups: [
    cacheFlushDateFaresGroup,
    validDateRangeGroup,
    terminalsGroup,
    terminalComboGroup,
    fareLineItemsGroup,
    fareTotalsGroup,
  ],
};
