import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
} as const;

// THEN import groups (which can use API constant)
import { cacheFlushDateFaresGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { fareLineItemsGroup } from "./fareLineItems/fareLineItems.endpoints";
import { fareTotalsGroup } from "./fareTotals/fareTotals.endpoints";
import { terminalComboGroup } from "./terminalCombo/terminalCombo.endpoints";
import { terminalsGroup } from "./terminals/terminals.endpoints";
import { validDateRangeGroup } from "./validDateRange/validDateRange.endpoints";

// Finally, construct full API definition using API constant
export const wsfFaresApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [
    cacheFlushDateFaresGroup,
    validDateRangeGroup,
    terminalsGroup,
    terminalComboGroup,
    fareLineItemsGroup,
    fareTotalsGroup,
  ],
} satisfies ApiDefinition;
