import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { tollRatesGroup } from "./tollRates/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/tollTripVersion.endpoints";

export const wsdotTollRatesApi = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
} satisfies ApiDefinition;
