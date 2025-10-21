import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { tollRatesResource } from "./tollRates/tollRates";
import { tollTripInfoResource } from "./tollTripInfo/tollTripInfo";
import { tollTripRatesResource } from "./tollTripRates/tollTripRates";
import { tollTripVersionResource } from "./tollTripVersion/tollTripVersion";

export const wsdotTollRatesApi: ApiDefinition = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpointGroups: [
    tollRatesResource,
    tollTripInfoResource,
    tollTripRatesResource,
    tollTripVersionResource,
  ],
};

// Export individual resources for direct use
export {
  tollRatesResource,
  tollTripInfoResource,
  tollTripRatesResource,
  tollTripVersionResource,
};
