import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsdot-toll-rates",
  baseUrl: "https://www.wsdot.wa.gov/traffic/api/tollrates/tollratesrest.svc",
} as const;

// THEN import groups (which can use API constant)
import { tollRatesGroup } from "./tollRates/tollRates.endpoints";
import { tollTripInfoGroup } from "./tollTripInfo/tollTripInfo.endpoints";
import { tollTripRatesGroup } from "./tollTripRates/tollTripRates.endpoints";
import { tollTripVersionGroup } from "./tollTripVersion/tollTripVersion.endpoints";

// Finally, construct full API definition using API constant
export const wsdotTollRatesApi = {
  name: API.name,
  baseUrl: API.baseUrl,
  endpointGroups: [
    tollRatesGroup,
    tollTripInfoGroup,
    tollTripRatesGroup,
    tollTripVersionGroup,
  ],
} satisfies ApiDefinition;
