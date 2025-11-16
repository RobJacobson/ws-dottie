import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cacheFlushDateFaresGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { fareLineItemsGroup } from "./fareLineItems/fareLineItems.endpoints";
import { fareTotalsGroup } from "./fareTotals/fareTotals.endpoints";
import { terminalComboGroup } from "./terminalCombo/terminalCombo.endpoints";
import { terminalsGroup } from "./terminals/terminals.endpoints";
import { validDateRangeGroup } from "./validDateRange/validDateRange.endpoints";

export const wsfFaresApi = {
  api: apis.wsfFares,
  endpointGroups: [
    cacheFlushDateFaresGroup,
    validDateRangeGroup,
    terminalsGroup,
    terminalComboGroup,
    fareLineItemsGroup,
    fareTotalsGroup,
  ],
} satisfies ApiDefinition;
