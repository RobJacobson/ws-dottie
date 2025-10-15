import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { tollRatesResource } from "./tollRates/tollRates";
import { tollTripInfoResource } from "./tollTripInfo";
import { tollTripRatesResource } from "./tollTripRates";
import { tollTripVersionResource } from "./tollTripVersion";

// Combine all resources into the legacy format for backward compatibility
export const wsdotTollRatesApi: ApiDefinition = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(tollRatesResource.endpoints),
    ...Object.values(tollTripInfoResource.endpoints),
    ...Object.values(tollTripRatesResource.endpoints),
    ...Object.values(tollTripVersionResource.endpoints),
  ],
};

// Export individual resources for direct use
export {
  tollRatesResource,
  tollTripInfoResource,
  tollTripRatesResource,
  tollTripVersionResource,
};
