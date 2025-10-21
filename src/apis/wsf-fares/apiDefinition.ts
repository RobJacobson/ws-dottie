import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate";
import { fareLineItemsResource } from "./fareLineItems/fareLineItems";
import { fareTotalsResource } from "./fareTotals/fareTotals";
import { terminalComboResource } from "./terminalCombo/terminalCombo";
import { terminalsResource } from "./terminals/terminals";
import { validDateRangeResource } from "./validDateRange/validDateRange";

export const wsfFaresApi: ApiDefinition = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpointGroups: [
    cacheFlushDateResource,
    validDateRangeResource,
    terminalsResource,
    terminalComboResource,
    fareLineItemsResource,
    fareTotalsResource,
  ],
};

// Export individual resources for direct use
export {
  cacheFlushDateResource,
  validDateRangeResource,
  terminalsResource,
  terminalComboResource,
  fareLineItemsResource,
  fareTotalsResource,
};
