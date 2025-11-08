import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { tollRatesResource } from "./tollRates/tollRates.endpoints";
import { tollTripInfoResource } from "./tollTripInfo/tollTripInfo.endpoints";
import { tollTripRatesResource } from "./tollTripRates/tollTripRates.endpoints";
import { tollTripVersionResource } from "./tollTripVersion/tollTripVersion.endpoints";

export const wsdotTollRatesApi = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpointGroups: [
    tollRatesResource,
    tollTripInfoResource,
    tollTripRatesResource,
    tollTripVersionResource,
  ],
} satisfies ApiDefinition;
