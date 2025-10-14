import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate";
import { fareLineItemsResource } from "./fareLineItems";
import { fareTotalsResource } from "./fareTotals";
import { terminalComboResource } from "./terminalCombo";
import { terminalsResource } from "./terminals";
import { validDateRangeResource } from "./validDateRange";

// Combine all resources into the legacy format for backward compatibility
export const wsfFaresApi: ApiDefinition = {
  name: "wsf-fares",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(cacheFlushDateResource.endpoints),
    ...Object.values(validDateRangeResource.endpoints),
    ...Object.values(terminalsResource.endpoints),
    ...Object.values(terminalComboResource.endpoints),
    ...Object.values(fareLineItemsResource.endpoints),
    ...Object.values(fareTotalsResource.endpoints),
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
